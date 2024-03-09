'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { login, register } from '@/features/auth/actions';
import AuthFormWrapper from '@/features/auth/components/auth-form-wrapper';
import { useAuthFormValidation } from '@/features/auth/hooks';
import { AuthFormType } from '@/features/auth/types';
import { initLoginValues, initRegisterValues } from '@/features/auth/utils/constants';
import { loginRedirect } from '@/lib/constants';
import { useScopedI18n } from '@/locales/client';

type AuthFormProps = {
  variant: 'login' | 'register';
};

const AuthForm = ({ variant = 'login' }: AuthFormProps) => {
  const router = useRouter();
  const { loginSchema, registerSchema } = useAuthFormValidation();
  const [isPending, startTransition] = useTransition();
  const t = useScopedI18n('authentication');

  const initValues = variant === 'login' ? initLoginValues : initRegisterValues;

  const form = useForm<AuthFormType>({
    resolver: zodResolver(variant === 'login' ? loginSchema : registerSchema),
    defaultValues: initValues,
  });

  const onSubmit: SubmitHandler<AuthFormType> = (data) => {
    startTransition(async () => {
      if (variant === 'login') {
        const res = await login(data);
        if (res?.error) {
          toast.error(res.error);
        } else {
          toast.success(t('login.toast.title'));
        }
      } else {
        const res = await register(data);
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success(t('register.toast.title'));
          router.push(loginRedirect);
        }
      }
    });
  };

  return (
    <AuthFormWrapper
      title={variant === 'login' ? t('login.title') : t('register.title')}
      backButtonLabel={variant === 'login' ? t('login.btnLabel') : t('register.btnLabel')}
      backButtonHref={variant === 'login' ? '/auth/register' : '/auth/login'}
      showSocials
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {variant === 'register' && (
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('register.inputs.name')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={`${t('placeholders.your')} ${t('register.inputs.name')}`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('login.inputs.email')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder={`${t('placeholders.enter')} ${t('login.inputs.email')}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('login.inputs.password')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder={`${t('placeholders.enter')} ${t('login.inputs.password')}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : variant === 'login' ? (
              t('login.btnSubmit')
            ) : (
              t('register.btnSubmit')
            )}
          </Button>
        </form>
      </Form>
    </AuthFormWrapper>
  );
};

export default AuthForm;
