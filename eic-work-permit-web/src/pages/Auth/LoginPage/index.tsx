/* eslint-disable */
import React from 'react';
import LoginPage from './main'

export default () => {
  return (
    <LoginPage onSubmit={function (data: any): void {
      throw new Error('Function not implemented.');
    } } isLoading={false} signup_link={''} />
  )
}