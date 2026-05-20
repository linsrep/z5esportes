import { ChangeEvent, FormEvent, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import Toast from '../components/Toast';
import { registerUser } from '../services/authService';

type FormValues = {
  name: string;
  cpf: string;
  email: string;
  password: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

type PasswordStrength = {
  label: string;
  tone: string;
  barClassName: string;
  widthClassName: string;
};

function formatCpf(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11);

  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function isValidCpf(value: string) {
  const cpf = value.replace(/\D/g, '');

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < 9; i += 1) {
    sum += Number(cpf[i]) * (10 - i);
  }

  let remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  if (remainder !== Number(cpf[9])) {
    return false;
  }

  sum = 0;
  for (let i = 0; i < 10; i += 1) {
    sum += Number(cpf[i]) * (11 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;

  return remainder === Number(cpf[10]);
}

function validateField(field: keyof FormValues, value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    if (field === 'name') return 'Informe seu nome completo.';
    if (field === 'cpf') return 'Informe seu CPF.';
    if (field === 'email') return 'Informe seu e-mail.';
    return 'Informe sua senha.';
  }

  if (field === 'cpf' && !isValidCpf(value)) {
    return 'Digite um CPF valido.';
  }

  if (field === 'email' && !EMAIL_REGEX.test(trimmedValue)) {
    return 'Digite um e-mail valido.';
  }

  if (field === 'password' && !PASSWORD_REGEX.test(value)) {
    return 'Use no minimo 8 caracteres, com letra e numero.';
  }

  return '';
}

function getPasswordStrength(password: string): PasswordStrength | null {
  if (!password) {
    return null;
  }

  let score = 0;

  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 1) {
    return {
      label: 'Fraca',
      tone: 'text-red-600',
      barClassName: 'bg-red-500',
      widthClassName: 'w-1/4',
    };
  }

  if (score === 2) {
    return {
      label: 'Media',
      tone: 'text-amber-600',
      barClassName: 'bg-amber-500',
      widthClassName: 'w-2/4',
    };
  }

  if (score === 3) {
    return {
      label: 'Boa',
      tone: 'text-sky-600',
      barClassName: 'bg-sky-500',
      widthClassName: 'w-3/4',
    };
  }

  return {
    label: 'Forte',
    tone: 'text-emerald-600',
    barClassName: 'bg-emerald-500',
    widthClassName: 'w-full',
  };
}

export default function Cadastro() {
  const [values, setValues] = useState<FormValues>({
    name: '',
    cpf: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showErrors, setShowErrors] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showToast, setShowToast] = useState(false);

  const passwordStrength = getPasswordStrength(values.password);

  const handleChange = (field: keyof FormValues) => (e: ChangeEvent<HTMLInputElement>) => {
    const nextValue = field === 'cpf' ? formatCpf(e.target.value) : e.target.value;

    setValues((current) => ({
      ...current,
      [field]: nextValue,
    }));

    if (showErrors) {
      setErrors((current) => ({
        ...current,
        [field]: validateField(field, nextValue),
      }));
    }

    if (submitFeedback) {
      setSubmitFeedback(null);
    }
  };

  const handleBlur = (field: keyof FormValues) => () => {
    setErrors((current) => ({
      ...current,
      [field]: validateField(field, values[field]),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors: FormErrors = {
      name: validateField('name', values.name),
      cpf: validateField('cpf', values.cpf),
      email: validateField('email', values.email),
      password: validateField('password', values.password),
    };

    setShowErrors(true);
    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }

    setIsSubmitting(true);
    setSubmitFeedback(null);

    try {
      const result = await registerUser(values);

      setSubmitFeedback({
        type: 'success',
        message: result.message,
      });
      setShowToast(true);
      setValues({
        name: '',
        cpf: '',
        email: '',
        password: '',
      });
      setErrors({});
      setShowErrors(false);
      setShowPassword(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Nao foi possivel concluir o cadastro agora.';

      setSubmitFeedback({
        type: 'error',
        message,
      });
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName = (field: keyof FormValues) =>
    `w-full rounded-2xl bg-slate-50 px-4 sm:px-5 py-3.5 text-sm font-medium transition-colors ${
      errors[field]
        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
        : 'border-slate-100 focus:border-primary focus:ring-primary'
    }`;

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-10 sm:px-6 sm:py-20">
      <div className="max-w-md w-full bg-white p-6 sm:p-10 rounded-[28px] sm:rounded-[32px] border border-slate-100 shadow-2xl shadow-slate-200/50">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 tracking-tight">Crie sua conta</h1>
          <p className="text-xs text-slate-500">Junte-se à maior comunidade esportiva do Brasil.</p>
        </div>

        <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit} noValidate>
          {submitFeedback && (
            <div
              role="alert"
              aria-live="polite"
              className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
                submitFeedback.type === 'error'
                  ? 'border-red-200 bg-red-50 text-red-700'
                  : 'border-emerald-200 bg-emerald-50 text-emerald-700'
              }`}
            >
              {submitFeedback.message}
            </div>
          )}

          <div>
            <label htmlFor="cadastro-name" className="text-[10px] font-bold text-slate-900 uppercase mb-1.5 block">Nome Completo</label>
            <input
              id="cadastro-name"
              type="text"
              required
              value={values.name}
              onChange={handleChange('name')}
              onBlur={handleBlur('name')}
              className={inputClassName('name')}
              placeholder="Seu nome completo"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'cadastro-name-error' : undefined}
            />
            {errors.name && <p id="cadastro-name-error" className="mt-1.5 text-xs font-medium text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="cadastro-cpf" className="text-[10px] font-bold text-slate-900 uppercase mb-1.5 block">CPF</label>
            <input
              id="cadastro-cpf"
              type="text"
              required
              inputMode="numeric"
              maxLength={14}
              value={values.cpf}
              onChange={handleChange('cpf')}
              onBlur={handleBlur('cpf')}
              className={inputClassName('cpf')}
              placeholder="000.000.000-00"
              aria-invalid={Boolean(errors.cpf)}
              aria-describedby={errors.cpf ? 'cadastro-cpf-error' : undefined}
            />
            {errors.cpf && <p id="cadastro-cpf-error" className="mt-1.5 text-xs font-medium text-red-600">{errors.cpf}</p>}
          </div>

          <div>
            <label htmlFor="cadastro-email" className="text-[10px] font-bold text-slate-900 uppercase mb-1.5 block">E-mail</label>
            <input
              id="cadastro-email"
              type="email"
              required
              value={values.email}
              onChange={handleChange('email')}
              onBlur={handleBlur('email')}
              className={inputClassName('email')}
              placeholder="seu@email.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'cadastro-email-error' : undefined}
            />
            {errors.email && <p id="cadastro-email-error" className="mt-1.5 text-xs font-medium text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="cadastro-password" className="text-[10px] font-bold text-slate-900 uppercase mb-1.5 block">Senha</label>
            <div className="relative">
              <input
                id="cadastro-password"
                type={showPassword ? 'text' : 'password'}
                required
                value={values.password}
                onChange={handleChange('password')}
                onBlur={handleBlur('password')}
                className={`${inputClassName('password')} pr-24`}
                placeholder="••••••••"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'cadastro-password-error' : 'cadastro-password-help'}
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary transition-colors hover:text-red-700"
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                aria-pressed={showPassword}
              >
                {showPassword ? <EyeOff size={18} strokeWidth={2.2} /> : <Eye size={18} strokeWidth={2.2} />}
              </button>
            </div>
            {passwordStrength && (
              <div className="mt-2" aria-live="polite">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-slate-500">Forca da senha</span>
                  <span className={`text-[11px] font-bold ${passwordStrength.tone}`}>{passwordStrength.label}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-300 ${passwordStrength.barClassName} ${passwordStrength.widthClassName}`} />
                </div>
              </div>
            )}
            {errors.password ? (
              <p id="cadastro-password-error" className="mt-1.5 text-xs font-medium text-red-600">{errors.password}</p>
            ) : (
              <p id="cadastro-password-help" className="mt-1.5 text-xs text-slate-500">Minimo de 8 caracteres, com letra, numero e, se possivel, caractere especial.</p>
            )}
          </div>

          <div className="flex items-center gap-2 py-2">
            <input type="checkbox" className="shrink-0 rounded border-slate-200 text-primary focus:ring-primary" id="terms" />
            <label htmlFor="terms" className="text-[12px] text-slate-500 leading-tight">
              Eu concordo com os <Link to="/termos" target="_blank" rel="noreferrer" className="text-primary font-bold hover:underline">Termos de Uso</Link> e a <Link to="/privacidade" target="_blank" rel="noreferrer" className="text-primary font-bold hover:underline">Politica de Privacidade</Link>.
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-3.5 sm:py-4 rounded-2xl font-black text-sm hover:bg-red-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-xl shadow-red-500/20 mt-2"
          >
            {isSubmitting ? 'Criando conta...' : 'Criar minha conta'}
          </button>
        </form>

        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-50 text-center">
          <p className="text-xs text-slate-500">
            Ja tem uma conta? <Link to="/login" className="text-primary font-bold hover:underline">Faca login</Link>
          </p>
        </div>
      </div>

      <Toast
        isOpen={showToast}
        onClose={() => setShowToast(false)}
        message={submitFeedback?.message ?? 'Cadastro realizado com sucesso.'}
        variant={submitFeedback?.type ?? 'success'}
      />
    </div>
  );
}
