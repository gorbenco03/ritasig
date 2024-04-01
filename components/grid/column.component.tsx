import React from 'react';
import clsx from 'clsx';

const classes = 'grid grid-cols-1 px-5 gap-y-[20px] max-w-full';

export function Column(props: JSX.IntrinsicElements['div']) {
  const { className, ...rest } = props;
  return <div className={clsx(classes, className)} {...rest} />;
}
