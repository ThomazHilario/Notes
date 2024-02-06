export function Notes(){
    return(
        <main className="h-screen w-full">
            <section className="grid grid-cols-3 grid-rows-[300px] gap-5 p-20">
                <div className="bg-slate-700 space-y-4 p-5 rounded-md">
                    <h1 className="text-slate-200 ">Adicionar nota</h1>

                    <p className="text-slate-400">
                        Grave uma nota em áudio que será convertida para texto automaticamente.
                    </p>
                </div>
                <div className="bg-gradient-to-t p-5 space-y-4 from-black/40 to-slate-700/90 rounded-md">
                    <h1 className="text-slate-200">ha dias</h1>
                    
                    <p className="text-slate-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis sunt aspernatur eos esse facere unde delectus libero aliquid. Nulla debitis unde.</p>

                    <p className="text-slate-400">facilis consectetur iusto voluptatibus corrupti, impedit provident atque aspernatur.</p>
                </div>
                <div className="bg-gradient-to-t p-5 space-y-4 from-black/40 to-slate-700/90 rounded-md">
                    <h1 className="text-slate-200">ha dias</h1>
                    
                    <p className="text-slate-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis sunt aspernatur eos esse facere unde delectus libero aliquid. Nulla debitis unde.</p>

                    <p className="text-slate-400">facilis consectetur iusto voluptatibus corrupti, impedit provident atque aspernatur.</p>
                </div>
            </section>
        </main>
    )
}