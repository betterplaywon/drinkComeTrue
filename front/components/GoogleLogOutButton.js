/**
 * @deprecated
 * 2023.02.09
 * 사용하지 않는 컴포넌트
 */

// import React from 'react';
// import { useSession, signOut } from 'next-auth/react';
// import Router from 'next/router';
// import { Button } from 'antd';

// const GoogleLogOutButton = () => {
//   const { data } = useSession();

//   const handleGoogleSignOut = () => {
//     signOut();
//     Router.replace('/');
//   };

//   return (
//     <>
//       <img
//         src={data?.user.image}
//         style={{ border: '3px solid white', borderRadius: '25px', marginRight: '5px', width: '40px' }}
//       />
//       <span style={{ color: 'white', marginRight: '8px' }}>환영합니다, {data?.user.name}님</span>
//       <Button shape="round" onClick={handleGoogleSignOut}>
//         Sign out
//       </Button>
//     </>
//   );
// };

// export default GoogleLogOutButton;
