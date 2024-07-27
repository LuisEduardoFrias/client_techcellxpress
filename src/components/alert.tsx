//
'use client'
import React, { useState, useEffect } from 'react';
import SuccesSvg from 'svg/success_svg'
import ErrorSvg from 'svg/error_svg'
import InfoSvg from 'svg/info_svg'
import 'st/alert.css'

export enum aletType {
  success = 'success',
  error = 'error',
  info = 'info',
}

export enum variantType {
  filled = 'filled',
  outlined = 'outlined',
}

export type DataAlert = {
  color: aletType;
  severity: aletType;
  message: string;
  variant?: variantType;
}

type AlertProps = {
  show: boolean;
  dataAlert: DataAlert;
  exe?: () => void;
};

export default function Alert({ show, exe, dataAlert }: AlertProps) {
  const [visible, setVisible] = useState(show);

  if (!dataAlert.variant) dataAlert.variant = variantType.outlined;

  const color =
    dataAlert.variant == variantType.filled ? 'white' :
      (dataAlert.color == aletType.info ? 'blue' :
        dataAlert.color == aletType.success ? 'green' :
          'red');

  const borderColor =
    dataAlert.severity == aletType.info ? 'blue' :
      dataAlert.severity == aletType.success ? 'green' :
        'red';

  useEffect(() => {
    setVisible(show);
    const timer = setTimeout(() => {
      if (exe)
        exe();
      setVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [show, exe]);

  if (!visible) {
    return null;
  }

  const Style = {
    color: color,
    border: `2px solid ${borderColor}`,
    backgroundColor:
      dataAlert.variant == variantType.filled ? borderColor : 'transparent',
  };

  return (
    <div
      style={Style}
      className='Alert'>
      <div className='alert-header'>
        {
          dataAlert.severity === aletType.success ?
            <SuccesSvg /> :
            dataAlert.severity === aletType.error ?
              <ErrorSvg /> :
              dataAlert.severity === aletType.info ?
                <InfoSvg /> : null
        }
        <label>{firstUC(dataAlert.severity)}</label>
      </div>
      {firstUC(dataAlert.message)}
    </div>
  );
}

function firstUC(text: string) {
  if (!text) return text;
  try {
    return text?.charAt(0).toUpperCase() + text?.slice(1);
  } catch (error) {
    console.error(error);
    return text;
  }
}
