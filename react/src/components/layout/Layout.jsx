import Header from './Header'

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <main>
        {children}
      </main>
    </div>
  )
}
