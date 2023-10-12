import React, { useRef } from 'react';
import './index.scss';
import { Badge } from 'antd';

interface DropdownProps {
  icon?: string;
  badge?: number;
  customToggle?: () => JSX.Element;
  contentData?: any[];
  renderItems?: (item: any, index: number) => JSX.Element;
  renderFooter?: () => JSX.Element;
}

export const Dropdown: React.FC<DropdownProps> = (props) => {
  const dropdownToggleEl = useRef(null);
  const dropdownContentEl = useRef(null);

  const clickOutsideRef = (contentRef: any, toggleRef: any) => {
    document.addEventListener('mousedown', (e) => {
      if (toggleRef.current && toggleRef.current.contains(e.target)) {
        contentRef.current.classList.toggle('active');
      } else {
        if (toggleRef.current && !contentRef.current.contains(e.target)) {
          contentRef.current.classList.remove('active');
        }
      }
    });
  };

  clickOutsideRef(dropdownContentEl, dropdownToggleEl);

  return (
    <div className="dropdown">
      <button ref={dropdownToggleEl} className="dropdown__toggle">
        {props.icon ? <i className={props.icon}></i> : ''}
        {props.badge ? (
          <Badge
            className="dropdown__toggle-badge"
            count={props.badge}
            overflowCount={9}
          ></Badge>
        ) : (
          ''
        )}
        {props.customToggle ? props.customToggle() : ''}
      </button>
      <div ref={dropdownContentEl} className="dropdown__content">
        {props.contentData &&
        (props.renderItems || ((item, index) => <div key={index}>{item}</div>))
          ? props.contentData.map((item, index) =>
              props.renderItems!(item, index),
            )
          : ''}
        {props.renderFooter ? (
          <div className="dropdown__footer">{props.renderFooter()}</div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
