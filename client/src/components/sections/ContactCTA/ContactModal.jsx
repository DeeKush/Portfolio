import { useEffect, useRef, useState } from 'react';
import profile from '../../../data/profile';
import { ContactError, sendMessage } from '../../../services/api';
import { useSmoothScroll } from '../../layout/SmoothScroll/SmoothScroll';
import { Close } from '../../ui/Icons/Icons';
import PillButton from '../../ui/PillButton/PillButton';

const EMPTY = { name: '', email: '', topic: '', message: '', website: '' }; // website = spam honeypot
const TOPICS = profile.contact.form.topics;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Same rules as apps-script/Code.gs, so most mistakes are caught before sending.
function validate({ name, email, topic, message }) {
  const errors = {};
  if (!name.trim()) errors.name = 'Please enter your name.';
  else if (name.trim().length > 100) errors.name = 'Name must be 100 characters or fewer.';
  if (!EMAIL_RE.test(email.trim())) errors.email = 'Please enter a valid email.';
  if (!TOPICS.includes(topic)) errors.topic = "Please choose what it's about.";
  if (message.trim().length < 10) errors.message = 'Message must be at least 10 characters.';
  else if (message.trim().length > 2000) errors.message = 'Message must be 2000 characters or fewer.';
  return errors;
}

export default function ContactModal({ open, onClose }) {
  const t = profile.contact.form;
  const dialog = useRef(null);
  const { lenis } = useSmoothScroll();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const d = dialog.current;
    if (open && !d.open) {
      setStatus((s) => (s === 'success' ? 'idle' : s));
      d.showModal();
      lenis?.stop();
    } else if (!open && d.open) {
      d.close();
    }
    if (!open) lenis?.start();
  }, [open, lenis]);

  const change = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setFormError('');
    const firstInvalid = Object.keys(EMPTY).find((k) => found[k]);
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    setStatus('sending');
    try {
      await sendMessage(values);
      setStatus('success');
      setValues(EMPTY);
    } catch (err) {
      setStatus('error');
      const kind = err instanceof ContactError ? err.kind : 'server';
      if (kind === 'invalid') setErrors(err.errors);
      setFormError(t.errors[kind]);
    }
  };

  const field = (name, label, props = {}) => {
    const Tag = props.as ?? (props.rows ? 'textarea' : 'input');
    delete props.as;
    return (
      <div className="contact-modal__field">
        <label htmlFor={`contact-${name}`}>{label}</label>
        <Tag
          id={`contact-${name}`}
          name={name}
          value={values[name]}
          onChange={change}
          aria-invalid={Boolean(errors[name])}
          aria-describedby={errors[name] ? `contact-${name}-error` : undefined}
          {...props}
        />
        {errors[name] && (
          <p className="contact-modal__error" id={`contact-${name}-error`}>
            {errors[name]}
          </p>
        )}
      </div>
    );
  };

  return (
    <dialog
      ref={dialog}
      className="contact-modal"
      aria-labelledby="contact-modal-title"
      onClose={onClose}
      onClick={(e) => e.target === dialog.current && onClose()}
      data-lenis-prevent
    >
      <div className="contact-modal__body">
        <div className="contact-modal__head">
          <h2 id="contact-modal-title">{t.title}</h2>
          <button type="button" className="contact-modal__close" onClick={onClose} aria-label={t.close}>
            <Close />
          </button>
        </div>

        {status === 'success' ? (
          <div className="contact-modal__success" role="status">
            <p>{t.success}</p>
            <PillButton arrow={false} onClick={onClose}>
              {t.close}
            </PillButton>
          </div>
        ) : (
          <form className="contact-modal__form" onSubmit={submit} noValidate>
            {field('name', t.name, { autoComplete: 'name', maxLength: 100 })}
            {field('email', t.email, { type: 'email', autoComplete: 'email' })}
            {field('topic', t.topic, {
              as: 'select',
              required: true,
              children: [
                <option key="" value="" disabled>
                  {t.topicPlaceholder}
                </option>,
                ...TOPICS.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                )),
              ],
            })}
            {field('message', t.message, { rows: 5, maxLength: 2000 })}
            <div className="contact-modal__hp" aria-hidden="true">
              <label htmlFor="contact-website">Website</label>
              <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={change} />
            </div>
            <p className="contact-modal__form-error" role="alert">
              {formError}
            </p>
            <PillButton type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? t.sending : t.submit}
            </PillButton>
          </form>
        )}
      </div>
    </dialog>
  );
}
