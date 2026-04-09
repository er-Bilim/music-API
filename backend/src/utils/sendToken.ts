import type { Response } from 'express';
import { WEEK } from '../constants/constants.ts';

export const setCookieToken = (res: Response, token: string) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    maxAge: WEEK,
  });
};

export const clearCookieToken = (res: Response, token: string) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    maxAge: 0,
  });
};
