import { Card, CardHeader } from '@/components';
import React, { useMemo } from 'react'

function ProEvaluations() {
  const evaluationsData = [
  {
    clientName: "Ana Costa",
    avatarUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1bfd8c?q=80&w=150&auto=format&fit=crop",
    serviceTitle: "Sanita a transbordar na casa de banho toda!!",
    rating: 5,
    comment: "O Celso foi um autêntico salvador! Chegou super rápido (em menos de 20 minutos) e resolveu a confusão na casa de banho. Muito educado e deixou tudo limpo no final. Recomendo a 100%.",
  },
  {
    clientName: "Miguel Domingos",
    avatarUrl: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=150&auto=format&fit=crop",
    serviceTitle: "Quadro Phillips disparando quando ligo o microondas",
    rating: 4,
    comment: "Bom serviço e percebe muito de eletricidade. Descobriu logo que o problema era um disjuntor antigo e trocou na hora. Só não dou 5 estrelas porque chegou 15 minutos atrasado devido ao trânsito.",
  },
  {
    clientName: "Fátima António",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop",
    serviceTitle: "Manutenção de Fossa Séptica",
    rating: 5,
    comment: "Trabalho impecável. É difícil encontrar profissionais sérios para este tipo de manutenção, mas a equipa foi rápida, transparente no orçamento e muito profissional. Vou guardar o contacto.",
  },
  {
    clientName: "João Mateus",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    serviceTitle: "Reparação de Fuga de Água",
    rating: 5,
    comment: "Rápido, honesto e cobrou exatamente o que estava estipulado na plataforma. Explicou-me o que causou a fuga para eu ter cuidado no futuro. Serviço 5 estrelas!",
  }
  ];

  const evaluations = useMemo(
    () => evaluationsData.map((evaluation, index) => {
      return(
        <Card>
          <CardHeader></CardHeader>
        </Card>
      )
    })
  )

  return (
    <React.Fragment>
      
    </React.Fragment>
  )
}

export {ProEvaluations};
