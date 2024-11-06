import Link from 'next/link';
import React from 'react';
import SignInButton from './signinButton';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import MonitorIcon from '@mui/icons-material/Monitor';
import SensorsIcon from '@mui/icons-material/Sensors';
import TableChartIcon from '@mui/icons-material/TableChart';

const Navbar = () => {
  return (
    <div className="flex flex-col mt-4 text-sm ">
      <Link href={'/machines'} className="menu-item">
        <PrecisionManufacturingIcon />
        <span className="menu-item-font">Machines</span>
      </Link>

      <Link href={'/monitoring-point'} className="menu-item">
        <MonitorIcon />
        <span className="menu-item-font">Monitoring Points</span>
      </Link>

      <Link href={'/sensor'} className="menu-item">
        <SensorsIcon />
        <span className="menu-item-font">Sensors</span>
      </Link>

      <Link href={'/all-data'} className="menu-item">
        <TableChartIcon />
        <span className="menu-item-font">All Data</span>
      </Link>

      <SignInButton />
    </div>
  );
};

export default Navbar;
