import UploadComponent from '@/components/UploadComponent';
import { useTranslations } from 'next-intl';
import { Stack } from '@chakra-ui/react';
export default function Page() {
  const t = useTranslations('Upload');
  return (
    <Stack>
      <UploadComponent
        upload={t('upload')}
        uploadError={t('uploadError')}
        hash1={t('hash1')}
        hashError={t('hashError')}
        input={t('input')}
        loading={t('loading')}
        text={t('text')}
      />
    </Stack>
  );
}
