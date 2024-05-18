import UploadComponent from '@/components/UploadComponent';
import { useTranslations } from 'next-intl';
import { Stack } from '@chakra-ui/react';
import AdminComponent from '@/components/AdminComponent';
export default function Page() {
  const t = useTranslations('Home');
  return (
    <Stack>
      <AdminComponent
        admin5={t('admin5')}
        admin1={t('admin1')}
        admin2={t('admin2')}
        admin3={t('admin3')}
        admin4={t('admin4')}
      />
    </Stack>
  );
}
