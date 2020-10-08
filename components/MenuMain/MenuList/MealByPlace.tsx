import React from 'react';
import { Shimmer, Text } from '@fluentui/react';
import { MealType, MealPlaces, useAPI } from 'hooks/api';
import useI18n from 'hooks/i18n';

import $ from './style.scss';
import D from './en.d.yml';

interface Props {
  type: MealType
  place: MealPlaces
  engTranslationRequired?: boolean
};

const MealByPlace: React.FC<Props> = (props: Props) => {
  const { getMenu, isMenuLoaded } = useAPI();
  const { t, getLocale } = useI18n(D);
  const { place, type, engTranslationRequired } = props;

  const createMenuTextList = (arr) => (
    <>
      {
        arr.map((m) => {
          let menuText = m;
          let isSearchable = true;
          if (menuText.indexOf('__') === 0) {
            menuText = menuText.substring(2);
            isSearchable = false;
          }
          return (
            <p key={`${place}-${type}-i${Math.random()}`}>
              {
                (isSearchable) ? (
                  <Text
                    variant="medium"
                    onClick={() => {
                      window.open(
                        `https://www.google.com/search?tbm=isch&q="${window.encodeURIComponent(menuText)}"`,
                        '_blank',
                      ).focus();
                    }}
                    title={`${t('눌러서 구글에서 ')}${menuText}${t(' 검색하기')}`}
                    className={$.buttonlikeMenuItem}
                  >
                    {menuText}
                  </Text>
                ) : (<Text variant="medium">{menuText}</Text>)
              }
            </p>
          );
        })
      }
    </>
  );

  const menu = getMenu(place, type);
  let menuLists = [<div><p>{t('DOM 생성 중 오류가 발생했습니다.')}</p></div>];
  if (menu) {
    if (menu instanceof Array) {
      menuLists = [
        <div data-list key={`${place}-${type}-${Math.random()}`}>
          { createMenuTextList(menu) }
        </div>,
      ];
    } else {
      const menuTitles = Object.keys(menu);
      menuLists = [];
      for (let idx = 0; idx < menuTitles.length; idx += 1) {
        menuLists.push(
          <div data-list key={`${place}-${type}-${Math.random()}`}>
            <h4>
              <Text variant="medium" className={$.subTitle}>
                {menuTitles[idx]}
              </Text>
              {
                engTranslationRequired && getLocale() === 'en' && (
                  <button
                    type="button"
                    title="Translate To English"
                    className={$.translate}
                    onClick={() => {
                      const text = `${menuTitles[idx].replace('일반식', '일반 식단')}\n\n${menu[menuTitles[idx]].map((_) => _.trim()).join('\n')}`;
                      window.open(
                        `https://translate.google.com/?vi=c#ko/en/${window.encodeURIComponent(text)}`,
                        '_blank',
                      ).focus();
                    }}
                  >
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 228.403 228.403">
                      <path d="M215.428,73.112h-79.797l-12.998-56.41H12.977C5.821,16.701,0,22.523,0,29.678v112.637c0,7.155,5.821,12.977,12.977,12.977 h79.794l12.999,56.41h109.659c7.154,0,12.975-5.821,12.975-12.977V86.088C228.403,78.933,222.583,73.112,215.428,73.112z M15,140.291V31.701h95.696l25.022,108.59H15z M108.164,155.291h28.195l-21.134,30.643L108.164,155.291z M213.403,196.701H126.02 l16.195-23.481l2.458,4.004c9.801-6.018,17.538-13.048,23.646-20.203l18.985,19.366l7.856-7.701l-20.103-20.506 c8.455-12.449,12.418-24.163,14.078-30.381h12.897v-11h-27.322v-6.555h-11v6.555h-20.317l-4.306-18.688h74.314V196.701z M154.565,155.291h0.003l-3.705-16.078l9.689,9.883c-1.989,2.39-4.18,4.765-6.588,7.089l0.611-0.887L154.565,155.291z M154.44,127.148l-5.186,5.084l-3.326-14.433h31.73c-1.684,5.371-4.87,13.541-10.514,22.309L154.44,127.148z M67.831,78.495h37.074 v7.5c0,20.442-16.631,37.074-37.074,37.074s-37.074-16.632-37.074-37.074c0-20.442,16.631-37.073,37.074-37.073 c8.261,0,16.077,2.658,22.603,7.686l-9.155,11.883c-3.878-2.989-8.528-4.568-13.448-4.568c-12.171,0-22.074,9.902-22.074,22.073 c0,12.172,9.902,22.074,22.074,22.074c9.539,0,17.685-6.084,20.762-14.574H67.831V78.495z" />
                    </svg>
                  </button>
                )
              }
            </h4>
            { createMenuTextList(menu[menuTitles[idx]]) }
          </div>,
        );
      }
    }
  }

  return (
    <div className={$.menuList}>
      {
        isMenuLoaded(place) ? menuLists : (
          <>
            <Shimmer />
            <Shimmer />
            <Shimmer width="95%" />
            <Shimmer width="75%" />
            <Shimmer width="40%" />
          </>
        )
      }
    </div>
  );
};

MealByPlace.defaultProps = {
  engTranslationRequired: false,
};

export default MealByPlace;
