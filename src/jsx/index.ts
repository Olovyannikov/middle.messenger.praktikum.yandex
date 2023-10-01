import { useEffect, useState, useUpdate, createStore } from '@/jsx/hooks';
import { createElement, createFragmentElement, render } from './core/jsx.ts';

export const VDom = {
    render,
    createElement,
    createFragmentElement,
    useState,
    useEffect,
    createStore,
    useUpdate,
};

export { useState, useEffect, createStore };

export type { Component } from './core/models';
