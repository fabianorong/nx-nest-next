import { getSession } from '@/src/lib/session';
import Link from 'next/link';
import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const SignInButton = async () => {
  const session = await getSession();
  return (
    <div className="menu-item">
      {!session || !session.user ? (
        <>
          <Link href={'/auth/signin'}>Sign In</Link>
          <Link href={'/auth/signup'}>Sign Up</Link>
        </>
      ) : (
        <>
          {/* <div>{session.user.name}</div> */}
          <ExitToAppIcon />
          <a href={'/api/auth/signout'} className="menu-item-font">
            Sign Out
          </a>
        </>
      )}
    </div>
  );
};

export default SignInButton;
