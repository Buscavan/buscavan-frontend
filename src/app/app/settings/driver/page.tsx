import FormSettings from './_components/form-settings'
import { VehicleTable } from './_components/vehicle-table'
import { columns } from './columns'

export default function Driver() {
  return (
    <div className="flex flex-col gap-4">
      <FormSettings />
      <VehicleTable
        columns={columns}
        data={[
          {
            id: '1',
            model: 'Mercedes Sprinter',
            plate: 'EVA1234',
            capacity: 16,
          },
        ]}
      />
    </div>
  )
}
