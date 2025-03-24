
export default function TurnosPage() {
    return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full sm:w-[450px] bg-gray-600 text-gray-300 shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Reserva tu turno</h2>

        <form className="space-y-4">
          <div>
            <label htmlFor="date" className="block font-medium mb-1">Fecha</label>
            <input 
              type="date" 
              id="date" 
              className="w-full p-2 rounded-lg  border border-gray-600 text-black focus:outline-none focus:ring-1 focus:ring-[#0099ff]"
            />
          </div>

          <div>
            <label htmlFor="note" className="block font-medium mb-1">Nota</label>
            <textarea 
              id="note" 
              placeholder="Escribí una nota..." 
              className="w-full p-2 rounded-lg border border-gray-600 text-black resize-none h-32 focus:outline-none focus:ring-1 focus:ring-[#0099ff]"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#0099ff] hover:bg-[#0088e6] transition-all text-white font-semibold p-2 rounded-lg"
          >
            Reservar
          </button>
        </form>
      </div>
    </div>
    )
}