import React from "react";

export const CardTitle = () => {
  return (
    <div className="flex items-center gap-4">
      <img
        src="/assets/uparupa-sidebar-logo-20260622.jpg"
        alt="Uparupa logo"
        width={52}
        height={52}
        className="sidebar-logo-image h-[52px] w-[52px] rounded-xl object-cover"
      />
      <div className="flex flex-col gap-4 select-none">
        <h3 className="m-0 whitespace-nowrap text-xl font-semibold text-default-900">
          UPARUPA
        </h3>
      </div>
    </div>
  );
};

