'use client'
import { ISummary } from '@/types'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Controller, useFormContext } from 'react-hook-form'
import { cn } from '@/lib/utils'

interface IProps {
  defaultValues?: ISummary
}

export const ActionsSummary = (props: IProps) => {
  const { defaultValues } = props
  const { control, watch } = useFormContext<ISummary>()

  return (
    <main className="flex flex-col gap-6 max-w-xl">
      <div>
        <h3 className="text-sm font-semibold tracking-tight">Acciones</h3>
        <p className="text-xs text-muted-foreground">
          Acciones a realizar con el resumen, aprueba o rechaza el resumen
        </p>
      </div>

      <section className="space-y-4">
        <Controller
          control={control}
          name="isActived"
          render={({ field: { value, onChange } }) => (
            <div className={cn(
              "flex items-center justify-between rounded-xl border p-4 transition-colors",
              value ? "bg-accent/50 border-primary/50" : "bg-card"
            )}>
              <div className="space-y-0.5">
                <Label htmlFor="active-summary" className="text-base font-semibold">Activar resumen</Label>
                <p className="text-xs text-muted-foreground">
                  Mostrar el resumen para asignar a un evento
                </p>
              </div>
              <Switch
                id="active-summary"
                checked={value}
                onCheckedChange={onChange}
              />
            </div>
          )}
        />

        <Controller
          control={control}
          name="isApproved"
          render={({ field: { value, onChange } }) => (
            <div className={cn(
              "flex items-center justify-between rounded-xl border p-4 transition-colors",
              value ? "bg-accent/50 border-primary/50" : "bg-card"
            )}>
              <div className="space-y-0.5">
                <Label htmlFor="approve-summary" className="text-base font-semibold">Aprobar resumen</Label>
                <p className="text-xs text-muted-foreground">
                  Aprobar el resumen para que sea visible en la plataforma
                </p>
              </div>
              <Switch
                id="approve-summary"
                checked={value}
                onCheckedChange={onChange}
              />
            </div>
          )}
        />
      </section>

      {!defaultValues?.isApproved && (
        <section className="p-4 rounded-xl border bg-muted/30">
          <Controller
            control={control}
            name="isNotification"
            render={({ field: { value, onChange } }) => (
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="notify-author"
                  disabled={!watch('isApproved')}
                  checked={value}
                  onCheckedChange={onChange}
                  className="mt-1"
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="notify-author"
                    className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Notificar al autor
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Enviar un correo al autor del resumen
                  </p>
                </div>
              </div>
            )}
          />
        </section>
      )}
    </main>
  )
}
