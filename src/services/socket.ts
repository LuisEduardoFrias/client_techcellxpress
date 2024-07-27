//
import { io } from 'socket.io-client'
import { baseApiTechcellxpress } from 'hp/api_router'

export default function socket(url: string) {
  const socket = io(baseApiTechcellxpress, { autoConnect: false });

  function ioConnet(connetName: string, fn: (value: number) => void) {
    socket.connect();
    socket.on(connetName, (nuevoProgreso: number) => {
      fn(nuevoProgreso);
    });
  }

  function ioEmit(emition: string, token: string) {
    socket.emit(emition, token);
  }

  function ioClose() {
    socket.disconnect();
  }

  return [ioConnet, ioEmit, ioClose]
};