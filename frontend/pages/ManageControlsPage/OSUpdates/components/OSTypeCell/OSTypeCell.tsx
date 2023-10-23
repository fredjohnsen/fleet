import Icon from "components/Icon";
import { IOperatingSystemVersion } from "interfaces/operating_system";
import React from "react";

const baseClass = "os-type-cell";

interface IOSTypeCellProps {
  osVersion: IOperatingSystemVersion;
}

const OSTypeCell = ({ osVersion }: IOSTypeCellProps) => {
  // we know at this point that the platform is one of these two, as we filter
  // the data in the parent component.
  const platform = osVersion.platform as "windows" | "darwin";

  return (
    <div className={baseClass}>
      <Icon name={platform} />
      <span>{osVersion.name_only}</span>
    </div>
  );
};

export default OSTypeCell;
