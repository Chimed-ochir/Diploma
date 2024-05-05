import VerifyComponent from '@/components/VerifyComponent';
import { Stack } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
export default function Page() {
  const t = useTranslations('Home');
  return (
    <Stack>
      <VerifyComponent
        title={t('button')}
        verifyText={t('verifyText')}
        success={t('success')}
        error={t('error')}
      />
    </Stack>
  );
}