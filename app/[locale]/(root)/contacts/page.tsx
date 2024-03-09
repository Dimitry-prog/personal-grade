import ContactForm from '@/app/[locale]/(root)/contacts/_components/contact-form';
import { getScopedI18n } from '@/locales/server';

const ContactsPage = async () => {
  const t = await getScopedI18n('contactsPage');

  return (
    <div className="flex flex-col items-center gap-8 py-10 md:py-14">
      <h2 className="text-center">{t('title')}</h2>

      <ContactForm />
    </div>
  );
};

export default ContactsPage;
