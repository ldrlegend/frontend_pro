'use client'

import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import App from "@/components/layout";

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
      <AntdRegistry>
        <App>{children}</App>
      </AntdRegistry>
    </body>
  </html>
);

export default RootLayout;
