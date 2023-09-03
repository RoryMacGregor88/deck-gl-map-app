import { SidebarComponent } from '~/types';

interface Props {
  sidebarComponents: SidebarComponent[];
}

const Sidebar = ({ sidebarComponents }: Props) => (
  <div className='absolute top-64 left-5 max-w-md max-h-96 z-10 text-white border-2 bg-black opacity-80 rounded-md border-white p-4 overflow-x-hidden overflow-y-scroll'>
    {sidebarComponents.map((Component: SidebarComponent) => (
      <div key={`${Component}`}>{Component}</div>
    ))}
  </div>
);

export default Sidebar;
