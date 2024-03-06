import ContactForm from '@/app/[locale]/(root)/contacts/_components/contact-form';
import LocaleProvider from '@/components/shared/locale-provider';
import { getScopedI18n } from '@/locales/server';

const ContactsPage = async ({ params: { locale } }: { params: { locale: string } }) => {
  const t = await getScopedI18n('contactsPage');

  return (
    <div className="flex flex-col items-center gap-8 py-10 md:py-14">
      <h2 className="text-center text-xl md:text-2xl">{t('title')}</h2>

      <LocaleProvider locale={locale}>
        <ContactForm />
      </LocaleProvider>
    </div>
  );
};

export default ContactsPage;
