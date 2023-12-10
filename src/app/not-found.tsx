import '@/assets/css/error.css'
import React from 'react';
import ErrorPage from '../components/error';

export default function NotFound(): any {
    return (
        <ErrorPage type='404' />
    );
}