import { css } from "goober";
import { Component, ComponentProps } from 'solid-js';

interface styleProps extends ComponentProps<any> {
  element: string,
  css: string,
  classNames: string
}
