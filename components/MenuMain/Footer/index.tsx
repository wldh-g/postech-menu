import React from 'react';
import {
  ActionButton, Text,
} from '@fluentui/react';
import HiddenText from 'components/Controls/HiddenText';
import useI18n from 'hooks/i18n';
import BrightnessMode from './BrightnessMode';
import CaptureMenu from './CaptureMenu';
import CopyText from './CopyText';
import ChangeLog from './ChangeLog';
import DispLocale from './DispLocale';
import ThirdPartyLicense from './3rdPartyLicense';

import $ from './style.scss';
import D from './en.d.yml';

const Footer: React.FC = () => {
  /* States */
  const { t, getLocale } = useI18n(D);

  /* Delivery Menu */
  const movePolivery = () => {
    window.open('http://delivery.postech.ac.kr/?search', '_blank').focus();
  };

  /* Error Report */
  const moveErrorReport = () => {
    window.location.href = 'mailto:dev@laffey.kr';
  };

  /* Status */
  const moveStatus = () => {
    window.open('https://status.menu.laffey.kr/', '_blank').focus();
  };

  /* Render */
  return (
    <footer>
      <div className={$.footerLine}>
        <DispLocale />
        <CaptureMenu />
        <CopyText />
        <ActionButton onClick={movePolivery} title={t('포스텍 배달음식 바로가기')}>
          {t('배달 음식')}
        </ActionButton>
      </div>
      <div className={$.footerLine}>
        <BrightnessMode />
        <ActionButton onClick={moveErrorReport}>{t('오류 신고')}</ActionButton>
        <ActionButton onClick={moveStatus}>{t('API 상태')}</ActionButton>
        {
          getLocale() === 'en' && (
            <ThirdPartyLicense />
          )
        }
      </div>
      <HiddenText lowerPad={2}>---</HiddenText>
      <p className={$.notSelectable}>
        <Text variant="smallPlus" className={$.selectable}>{t('데이터: 포스텍 복지회, 신세계푸드.')}</Text>
        <br />
        <Text variant="smallPlus">
          {t('시스템: ')}
          <a
            href="https://github.com/wldh-g/postech-menu"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('실토')}
          </a>
          .
        </Text>
      </p>
      <p className={$.version}>
        <ChangeLog />
      </p>
    </footer>
  );
};

export default Footer;
