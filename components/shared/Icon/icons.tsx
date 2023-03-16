import React from 'react'

function PlusIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.0643 22V2H12.9374V22H11.0643Z" fill="currentColor" />
      <path d="M11.0643 22V2H12.9374V22H11.0643Z" fill="currentColor" />
      <path d="M2 11.0627H22V12.9358H2V11.0627Z" fill="currentColor" />
      <path d="M2 11.0627H22V12.9358H2V11.0627Z" fill="currentColor" />
    </svg>
  )
}

function GalleryIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M1.5 1.5H10.8333V10.8333H1.5V1.5ZM13.1667 1.5H22.5V10.8333H13.1667V1.5ZM3.33333 3.33333V9H9V3.33333H3.33333ZM15 3.33333V9H20.6667V3.33333H15ZM1.5 13.1667H10.8333V22.5H1.5V13.1667ZM13.1667 13.1667H22.5V22.5H13.1667V13.1667ZM3.33333 15V20.6667H9V15H3.33333ZM15 15V20.6667H20.6667V15H15Z" fill="currentColor" />
    </svg>

  )
}

function ListIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M4.86759 7.7H2V6.3H4.86759V7.7ZM22 7.7H7.66206V6.3H22V7.7ZM4.86759 12.7183H2V11.3183H4.86759V12.7183ZM22 12.7183H7.66206V11.3183H22V12.7183ZM4.86759 17.7366H2V16.3366H4.86759V17.7366ZM22 17.7366H7.66206V16.3366H22V17.7366Z" fill="currentColor" />
    </svg>

  )
}

function DownCaretIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M3 7.98995L3.98995 7L11.995 15.005L20 7L20.9899 7.98995L11.995 16.9849L3 7.98995Z" fill="currentColor" />
    </svg>
  )
}

function UpCaretIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M21 15.995L20.0101 16.9849L12.005 8.9799L4 16.9849L3.01005 15.995L12.005 7L21 15.995Z" fill="currentColor" />
    </svg>

  )
}

function LeftCaretIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M15.995 3L16.9849 3.98995L8.9799 11.995L16.9849 20L15.995 20.9899L7 11.995L15.995 3Z" fill="currentColor" />
    </svg>

  )
}

function RightCaretIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M7.98995 21L7 20.0101L15.005 12.005L7 4L7.98995 3.01005L16.9849 12.005L7.98995 21Z" fill="currentColor" />
    </svg>

  )
}

function LinkIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 2L17 2.625L18.5238 4.14874L11.9213 10.75L13.25 12.0775L19.8513 5.47624L21.375 6.99999L22 2ZM3.25006 3.87499C2.91641 3.87192 2.59445 3.99775 2.35131 4.22624C2.1227 4.46932 1.99686 4.79132 2.00006 5.12499V20.7499C1.99699 21.0836 2.12282 21.4055 2.35131 21.6487C2.59438 21.8773 2.91639 22.0031 3.25006 21.9999H18.875C19.0409 22.0063 19.2062 21.9782 19.3607 21.9177C19.5153 21.8571 19.6556 21.7652 19.7729 21.6479C19.8903 21.5305 19.9821 21.3902 20.0427 21.2357C20.1033 21.0812 20.1313 20.9158 20.125 20.7499V11.375H18.25V20.1249H3.87505V5.74999H13.25V3.87499H3.25006Z" fill="currentColor" />
    </svg>
  )
}

export const Icons = {
  Plus: PlusIcon,
  Gallery: GalleryIcon,
  List: ListIcon,
  DownCaret: DownCaretIcon,
  UpCaret: UpCaretIcon,
  LeftCaret: LeftCaretIcon,
  RightCaret: RightCaretIcon,
  Link: LinkIcon
}

export type TIconName = keyof typeof Icons
