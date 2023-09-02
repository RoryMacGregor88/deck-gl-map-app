const Button = ({ children, onClick }) => (
  <button
    style={{ padding: '1rem', borderRadius: '5px', cursor: 'pointer' }}
    onClick={onClick}
  >
    {children}
  </button>
);

const Sidebar = ({ setLayerVisibility, sidebarComponents }) => {
  const handleClick = (type: string) =>
    setLayerVisibility((prev) => ({ ...prev, [type]: !prev[type] }));
  return (
    <div
      style={{
        position: 'absolute',
        top: '2rem',
        left: '2rem',
        width: '30rem',
        height: '20rem',
        zIndex: 100,
        border: '2px solid #fff',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '5px',
        padding: '2rem',
      }}
    >
      {/* <div>
        <h1 style={{ color: '#fff' }}>Shops 1986</h1>
        <Button onClick={() => handleClick('1986')}>View</Button>
      </div>
      <h1 style={{ color: '#fff' }}>Shops 2015</h1>
      <Button onClick={() => handleClick('2015')}>View</Button> */}

      {sidebarComponents.map((Component) => {
        return <div>{Component}</div>;
      })}
    </div>
  );
};

export default Sidebar;
