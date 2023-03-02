import React from "react";
import { render } from "react-dom";
import { Search, Notification, Switcher } from "@carbon/icons-react";
import {
  Header,
  HeaderName,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
  Theme
} from "@carbon/react";

export const NavHeader = () => {
   
    return (
        <div className="container">
    <Theme theme="white">
      <Header aria-label="IBM Platform Name">
        <HeaderName href="#" prefix="">
          Discover
        </HeaderName>
        <HeaderNavigation aria-label="IBM [Platform]">
        <HeaderMenu aria-label="IBM Automation " menuLinkName="IBM Automation ">
            <HeaderMenuItem href="/baw">BAW</HeaderMenuItem>
            <HeaderMenuItem href="#">ODM</HeaderMenuItem>
            <HeaderMenuItem href="#">RPA</HeaderMenuItem>
          </HeaderMenu>
          <HeaderMenu aria-label="3rd Party Automation " menuLinkName="3rd Party Automation ">
            <HeaderMenuItem href="/ui-path">UI Path</HeaderMenuItem>
          </HeaderMenu>
          <HeaderMenuItem href="#">OpenAPI</HeaderMenuItem>
        </HeaderNavigation>
      </Header>
    </Theme>
      </div>
    );
  };
  