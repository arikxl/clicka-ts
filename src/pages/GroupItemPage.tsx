import { useParams } from 'react-router'

import GroupDisplay from '../components/GroupDisplay'

const GroupItemPage = () => {

    const { id } = useParams<{ id: string }>();


  return (
      <div className="pt-10">
 
          <GroupDisplay groupId={ Number(id)} />
      </div>
  )
}

export default GroupItemPage