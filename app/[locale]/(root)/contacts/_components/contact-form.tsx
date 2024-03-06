'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useContactFormValidation } from '@/app/[locale]/(root)/contacts/_hooks';
import { ContactFormDataType } from '@/app/[locale]/(root)/contacts/_types';
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
import { Textarea } from '@/components/ui/textarea';
import { useScopedI18n } from '@/locales/client';

const ContactForm = () => {
  const t = useScopedI18n('contactsPage.form');
  const contactFormSchema = useContactFormValidation();

  const form = useForm<ContactFormDataType>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit: SubmitHandler<ContactFormDataType> = (values) => {
    console.log(values);
  };

  return (
    <div className="w-full max-w-3xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('name')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('name')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('email')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('email')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('msg')}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t('msg')}
                    {...field}
                    className="min-h-40 resize-none md:min-h-60"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full sm:w-fit">
            {t('btn')}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
