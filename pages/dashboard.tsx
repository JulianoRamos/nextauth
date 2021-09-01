import { useContext, useEffect } from "react"
import { Can } from "../components/Can";
import { AuthContext } from "../contexts/AuthContext"
import { useCan } from "../hooks/useCan";
import { setupApiClient } from "../services/api";
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
  const { user, signOut } = useContext(AuthContext);

  const userCanSeeMetrics = useCan({
    permissions: ['metrics.list']
  })

  useEffect(() => {
    api.get('/me').then(response => {
      console.log(response)
    }).catch((err) => {
      console.log(err);
    });
  }, [])

  return (
    <>      
      <h1>Dashboard: {user?.email}</h1>

      <button onClick={signOut}>Sign Out</button>

      { userCanSeeMetrics && <div>Métricas</div> }
      
      <Can permissions={['metrics.list']}>
        <div>Métricas 2</div> 
      </Can>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {    
  const apiClient = setupApiClient(ctx);    
  const response = await apiClient.get('/me');   

  return {
    props: {}
  }
})
 