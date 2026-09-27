import React, { useMemo, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const DEMO_ESTABLISHMENTS = [
  {
    id: 1,
    name: 'Mamá Dolores',
    address: 'Calatayud',
  },
  {
    id: 2,
    name: 'Tizón',
    address: 'Calatayud',
  },
  {
    id: 3,
    name: 'Bar Capricho',
    address: 'Calatayud',
  },
  {
    id: 4,
    name: 'Mesón de la Dolores',
    address: 'Calatayud',
  },
];

export default function Demo() {
  const [registered, setRegistered] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [visits, setVisits] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  });

  const [message, setMessage] = useState('');

  const totalVisits = useMemo(
    () => Object.values(visits).reduce((total, value) => total + value, 0),
    [visits]
  );

  const totalParticipations = useMemo(
    () =>
      Object.values(visits).reduce((total, visitCount) => {
        if (visitCount === 0) return total;
        return total + 2 + Math.max(0, visitCount - 1);
      }, 0),
    [visits]
  );

  const establishmentsVisited = Object.values(visits).filter(
    (value) => value > 0
  ).length;

  function registerCustomer(event) {
    event.preventDefault();

    if (!name.trim() || !phone.trim()) {
      setMessage('Introduce tu nombre y tu número de móvil.');
      return;
    }

    setRegistered(true);
    setMessage('');
  }

  function simulateVisit(establishment) {
    setVisits((current) => {
      const previousVisits = current[establishment.id] || 0;

      return {
        ...current,
        [establishment.id]: previousVisits + 1,
      };
    });

    const currentVisits = visits[establishment.id] || 0;

    if (currentVisits === 0) {
      setMessage(
        `¡Participación validada en ${establishment.name}! Has conseguido +2 participaciones.`
      );
    } else {
      setMessage(
        `¡Nueva visita validada en ${establishment.name}! Has conseguido +1 participación.`
      );
    }
  }

  function resetDemo() {
    setRegistered(false);
    setName('');
    setPhone('');
    setVisits({
      1: 0,
      2: 0,
      3: 0,
      4: 0,
    });
    setMessage('');
  }

  if (!registered) {
    return (
      <div className="app">
        <div
          className="card"
          style={{
            maxWidth: 560,
            margin: '40px auto',
            padding: 30,
          }}
        >
          <div
            style={{
              textAlign: 'center',
              marginBottom: 25,
            }}
          >
            <div
              style={{
                display: 'inline-block',
                padding: '7px 14px',
                borderRadius: 999,
                background: '#fef3c7',
                color: '#92400e',
                fontWeight: 700,
                fontSize: 13,
                marginBottom: 15,
              }}
            >
              MODO DEMO
            </div>

            <h1 style={{ marginBottom: 8 }}>
              Ruta de la Tortilla
            </h1>

            <p style={{ margin: 0 }}>
              4ª edición · Octubre 2026
            </p>
          </div>

          <div
            style={{
              background: '#f8fafc',
              borderRadius: 14,
              padding: 20,
              marginBottom: 25,
            }}
          >
            <h2 style={{ marginTop: 0 }}>
              Participa en la ruta
            </h2>

            <p>
              Regístrate y muestra tu QR en los establecimientos
              participantes para validar tus visitas.
            </p>

            <p style={{ marginBottom: 0 }}>
              <strong>Primera visita:</strong> +2 participaciones
              <br />
              <strong>Visitas posteriores:</strong> +1 participación
            </p>
          </div>

          <form onSubmit={registerCustomer}>
            <label>
              Nombre
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Tu nombre"
              />
            </label>

            <label style={{ display: 'block', marginTop: 16 }}>
              Número de móvil
              <input
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="600 000 000"
              />
            </label>

            {message && (
              <div
                style={{
                  marginTop: 15,
                  padding: 12,
                  borderRadius: 10,
                  background: '#fee2e2',
                }}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                marginTop: 22,
                padding: '14px 18px',
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              Entrar en la ruta
            </button>
          </form>

          <p
            style={{
              textAlign: 'center',
              fontSize: 12,
              marginTop: 25,
              opacity: 0.65,
            }}
          >
            Esta pantalla utiliza datos ficticios para la demostración.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header
        style={{
          marginBottom: 20,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 15,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-block',
                padding: '5px 10px',
                borderRadius: 999,
                background: '#fef3c7',
                color: '#92400e',
                fontWeight: 700,
                fontSize: 12,
                marginBottom: 8,
              }}
            >
              DEMO
            </div>

            <h1 style={{ margin: 0 }}>
              Hola, {name}
            </h1>

            <p style={{ marginTop: 5 }}>
              4ª Ruta de la Tortilla · Octubre 2026
            </p>
          </div>

          <button
            type="button"
            onClick={resetDemo}
            className="secondary"
          >
            Reiniciar demo
          </button>
        </div>
      </header>

      {message && (
        <div
          style={{
            padding: 15,
            borderRadius: 12,
            background: '#dcfce7',
            marginBottom: 20,
            fontWeight: 600,
          }}
        >
          {message}
        </div>
      )}

      <section className="stats">
        <div className="card">
          <strong>{totalParticipations}</strong>
          <span>Participaciones</span>
        </div>

        <div className="card">
          <strong>{totalVisits}</strong>
          <span>Visitas</span>
        </div>

        <div className="card">
          <strong>{establishmentsVisited}</strong>
          <span>Establecimientos visitados</span>
        </div>
      </section>

      <section
        className="card"
        style={{
          marginTop: 20,
          textAlign: 'center',
        }}
      >
        <h2>Tu QR permanente</h2>

        <p>
          Muéstralo en el establecimiento para validar tu
          participación.
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <QRCodeSVG
            value="DEMO-IV-RUTA-TORTILLA-2026-CLIENTE-001"
            size={220}
            level="M"
          />
        </div>

        <p
          style={{
            fontSize: 12,
            opacity: 0.6,
            marginBottom: 0,
          }}
        >
          QR exclusivo de demostración
        </p>
      </section>

      <section
        className="card"
        style={{
          marginTop: 20,
        }}
      >
        <h2>Establecimientos</h2>

        <p>
          Simula una validación para ver cómo funcionan las
          participaciones.
        </p>

        <div
          style={{
            display: 'grid',
            gap: 14,
            marginTop: 20,
          }}
        >
          {DEMO_ESTABLISHMENTS.map((establishment) => {
            const visitCount = visits[establishment.id] || 0;

            return (
              <div
                key={establishment.id}
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: 14,
                  padding: 16,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 15,
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <strong>{establishment.name}</strong>

                  <div
                    style={{
                      fontSize: 13,
                      opacity: 0.7,
                      marginTop: 4,
                    }}
                  >
                    {establishment.address}
                  </div>

                  <div
                    style={{
                      marginTop: 7,
                      fontSize: 14,
                    }}
                  >
                    Visitas: <strong>{visitCount}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => simulateVisit(establishment)}
                >
                  Simular visita
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section
        className="card"
        style={{
          marginTop: 20,
        }}
      >
        <h2>¿Cómo funciona?</h2>

        <ol
          style={{
            lineHeight: 1.8,
            paddingLeft: 22,
          }}
        >
          <li>Te registras con tu nombre y móvil.</li>
          <li>Consultas tu QR permanente.</li>
          <li>Muestras tu QR en el establecimiento.</li>
          <li>El establecimiento lo escanea.</li>
          <li>Tu visita queda validada.</li>
          <li>Obtienes tus participaciones.</li>
        </ol>
      </section>

      <footer
        style={{
          textAlign: 'center',
          padding: '30px 10px',
          fontSize: 12,
          opacity: 0.65,
        }}
      >
        Demo de la 4ª Ruta de la Tortilla de Calatayud
      </footer>
    </div>
  );
}
