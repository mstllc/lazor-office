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

export const Icons = {
  Plus: PlusIcon,
  Gallery: GalleryIcon,
  List: ListIcon,
  DownCaret: DownCaretIcon,
  UpCaret: UpCaretIcon,
  LeftCaret: LeftCaretIcon,
  RightCaret: RightCaretIcon
}

export type TIconName = keyof typeof Icons
