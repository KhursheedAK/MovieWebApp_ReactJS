// App.tsx
import './App.css';
import Cards from './Pages/Cards';

export default function App() {
  return (
    <>
      <div className="backdrop" aria-hidden="true" />
      <div className="mainContainer">
        <Cards />
      </div>
    </>
  );
}
