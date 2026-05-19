import React, { useMemo } from 'react'
import { StarIcon } from '@phosphor-icons/react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter} from '@/components';

function ProHistory() {

const servicesProvided = [
  {
    clientName: "Maria Eduarda",
    location: "Maianga, Luanda",
    title: "Reparação de Fuga de Água",
    category: "Canalizador",
    type: "Reparo",
    scheduledDate: "28/04/2026",
    completedDate: "28/04/2026",
    earnings: "12.000 Kz",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=150&auto=format&fit=crop",
  },
  {
    clientName: "Paulo Gomes",
    location: "Talatona, Luanda",
    title: "Quadro Phillips disparando quando ligo o microondas",
    category: "Eletricista",
    type: "Instalação",
    scheduledDate: "25/04/2026",
    completedDate: "26/04/2026",
    earnings: "25.000 Kz",
    rating: 4,
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=150&auto=format&fit=crop",
  },
  {
    clientName: "Ana Costa",
    location: "Miramar, Luanda",
    title: "Sanita a transbordar na casa de banho toda!!",
    category: "Canalizador",
    type: "Emergência",
    scheduledDate: "20/04/2026",
    completedDate: "20/04/2026",
    earnings: "18.500 Kz",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1505691938895-1758d7bef51a?q=80&w=150&auto=format&fit=crop",
  },
  {
    clientName: "Rui Machado",
    location: "Ingombota, Luanda",
    title: "Manutenção de Fossa Séptica",
    category: "Pedreiro",
    type: "Manutenção",
    scheduledDate: "15/04/2026",
    completedDate: "17/04/2026",
    earnings: "40.000 Kz",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=150&auto=format&fit=crop",
  },
];

  const servicesHistory = useMemo(
    () => servicesProvided.map((service, index) => {
      return(
        <Card className='rounded-lg w-full' key={index}>
          <CardHeader>
            <div className='flex items-center gap-5'>
              <div className='border rounded-lg size-10 aspect-square'>
                <img 
                src={service.imageUrl} 
                alt=""
                className='size-full bg-cover bg-center rounded-lg'
                />
              </div>
              <CardTitle>{service.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className='flex justify-between items-center [&_span:first-child]:font-medium [&_span:first-child]:text-slate-900 [&_span:first-child]:mr-1 [&_span:last-child]:text-slate-500 text-sm'>
              <div className="flex flex-col gap-1">
                <div><span>Cliente:</span> <span>{service.clientName}</span></div>
                <div><span>Localização:</span> <span>{service.location}</span></div>
              </div>
              
              <div className="flex flex-col gap-1">
                <div><span>Tipo:</span> <span>{service.type}</span></div>
                <div><span>Categoria:</span> <span>{service.category}</span></div>
              </div>
              
              <div className="flex flex-col gap-1">
                <div><span>Agendado em:</span> <span>{service.scheduledDate}</span></div>
                <div><span>Completado em:</span> <span>{service.completedDate}</span></div>
              </div>
          </CardContent>
          <CardFooter className='flex justify-between items-center'>
            <div className='flex gap-1'>
              <div><span>Avaliacao</span></div>
              <div><span>{service.rating}</span></div>
            </div>
            <div className='flex gap-1'>
              <div><span>Ganho</span></div>
              <div><span>{service.earnings}</span></div>
            </div>
          </CardFooter>
        </Card>
      )
    }), [servicesProvided]
  )

  return (
    <React.Fragment>
      <section className='bg-white flex gap-10 p-20 w-full h-full'>
        <section className='flex flex-col gap-7.5 w-full'>
          {servicesHistory}
        </section>
        <section className='flex flex-col gap-5'>
          <div className="rounded-2xl bg-primary border border-blue-100 shadow-sm p-6 text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-primary/80">Avaliação Geral</p>
              <div className="flex items-center justify-center gap-1 mt-3">
                {[1,2,3,4,5].map((i) => (
                  <StarIcon key={i} size={28} weight="fill" className="text-yellow-400" />
                ))}
              </div>
              <p className="text-white text-4xl font-extrabold text-primary mt-3">4.9</p>
              <p className="text-white text-xs text-muted-foreground mt-1">142 avaliações</p>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Desempenho</p>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-muted-foreground">Taxa de Conclusão</span>
                    <span className="font-extrabold">98%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-success rounded-full" style={{ width: "98%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-muted-foreground">Tempo Resp. Médio</span>
                    <span className="font-extrabold">15 min</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>
              </div>
            </div>
        </section>
      </section>
    </React.Fragment>
  )
}

export {ProHistory};
