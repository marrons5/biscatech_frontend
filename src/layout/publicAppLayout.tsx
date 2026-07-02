import { PublicNav } from "@/components/custom/publicNav";
import React from "react";
import { Outlet } from "react-router-dom";
function PublicAppLayout() {
    return (
      <React.Fragment>
        <div className="bg-background">
          <PublicNav />
          <div>
            <Outlet />
          </div>
        </div>
      </React.Fragment>
    );
}

export { PublicAppLayout }