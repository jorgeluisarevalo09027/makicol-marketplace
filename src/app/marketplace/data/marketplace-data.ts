export interface Producto {
  id: number;
  nombre: string;
  artesano: string;
  region: string;
  precio: number;
  categoria: string;
  rating: number;
  resenas: number;
  imagen: string;
  descripcion: string;
  vendidos: number;
}

export interface Artesano {
  id: number;
  nombre: string;
  region: string;
  ciudad: string;
  tipo: string;
  rating: number;
  resenas: number;
  productos: number;
  icono: string;
  avatar: string;
  portada: string;
  anioInicio: number;
  bio: string;
  materiales: string[];
}

export interface Pedido {
  id: string;
  producto: string;
  comprador: string;
  ciudad: string;
  fecha: string;
  total: number;
  estado: 'Recibido' | 'En preparación' | 'Enviado' | 'Entregado';
}

export interface Resena {
  autor: string;
  ciudad: string;
  rating: number;
  comentario: string;
  producto: string;
  fecha: string;
}

export const CATEGORIAS = ['Todos', 'Tejidos', 'Sombreros', 'Joyería', 'Cerámica', 'Libros'];

export const REGIONES = ['Santa Marta', 'Riohacha', 'Valledupar', 'Mompox', 'San Jacinto', 'El Carmen de Bolívar'];

export const PRODUCTOS: Producto[] = [
  {
    id: 1, nombre: 'Mochila Wayúu Grande', artesano: 'María Pushaina',
    region: 'Riohacha, Guajira', precio: 185000, categoria: 'Tejidos',
    rating: 4.8, resenas: 127, imagen: '/assets/foto1.webp', vendidos: 245,
    descripcion: 'Mochila tradicional tejida a mano por artesanas Wayúu con colores naturales del desierto guajiro. Dimensiones: 35×30 cm.',
  },
  {
    id: 2, nombre: 'Sombrero Vueltiao 21 Vueltas', artesano: 'Carmen Vidal',
    region: 'El Carmen de Bolívar', precio: 95000, categoria: 'Sombreros',
    rating: 4.9, resenas: 89, imagen: '/assets/foto2.webp', vendidos: 183,
    descripcion: 'Símbolo nacional tejido en caña flecha por artesanas del norte de Bolívar. Declarado Patrimonio Cultural Inmaterial.',
  },
  {
    id: 3, nombre: 'Filigrana de Plata Mariposa', artesano: 'Luis Castillo',
    region: 'Mompox, Bolívar', precio: 145000, categoria: 'Joyería',
    rating: 4.6, resenas: 45, imagen: '/assets/foto3.webp', vendidos: 67,
    descripcion: 'Joya en plata 950 trabajada con la técnica de filigrana momposina, Patrimonio de la Humanidad UNESCO.',
  },
  {
    id: 4, nombre: 'Hamaca Artesanal San Jacinto', artesano: 'Pedro Zuleta',
    region: 'San Jacinto, Bolívar', precio: 220000, categoria: 'Tejidos',
    rating: 4.4, resenas: 34, imagen: '/assets/foto4.webp', vendidos: 52,
    descripcion: 'Hamaca tejida en algodón natural con diseños geométricos tradicionales del Caribe. Largo: 1.80 m.',
  },
  {
    id: 5, nombre: 'Cerámica Ritual Tayrona', artesano: 'Jorge Martínez',
    region: 'Santa Marta, Magdalena', precio: 75000, categoria: 'Cerámica',
    rating: 4.5, resenas: 56, imagen: '/assets/foto5.webp', vendidos: 98,
    descripcion: 'Cerámica inspirada en la tradición Tayrona, modelada a mano y cocida en horno de leña por maestro artesano.',
  },
  {
    id: 6, nombre: 'Voces del Caribe — Antología', artesano: 'Editorial Caribe Cultural',
    region: 'Santa Marta, Magdalena', precio: 35000, categoria: 'Libros',
    rating: 4.7, resenas: 23, imagen: '/assets/foto6.webp', vendidos: 134,
    descripcion: 'Antología de poesía y narrativa de autores del litoral Caribe colombiano. Edición independiente, 280 páginas.',
  },
  {
    id: 7, nombre: 'Collar de Semillas Wayúu', artesano: 'María Pushaina',
    region: 'Riohacha, Guajira', precio: 55000, categoria: 'Joyería',
    rating: 4.8, resenas: 78, imagen: '/assets/foto7.webp', vendidos: 312,
    descripcion: 'Collar multicolor elaborado con semillas naturales y cuentas de vidrio por artesanas Wayúu. Largo: 60 cm.',
  },
  {
    id: 8, nombre: 'Tapiz Caribe Multicolor', artesano: 'Rosa Noriega',
    region: 'Valledupar, Cesar', precio: 165000, categoria: 'Tejidos',
    rating: 4.7, resenas: 92, imagen: '/assets/foto8.webp', vendidos: 78,
    descripcion: 'Tapiz tejido en telar con motivos del folclor vallenato y la cultura del Cesar. 80×120 cm.',
  },
];

export const ARTESANOS: Artesano[] = [
  {
    id: 1, nombre: 'María Pushaina', region: 'Riohacha, Guajira', ciudad: 'Riohacha',
    tipo: 'Tejidos Wayúu', rating: 4.8, resenas: 234, productos: 12, icono: '🧶',
    avatar: '/assets/artesana-maria-pushaina-avatar.webp', portada: '/assets/artesana-maria-pushaina-portada.webp',
    anioInicio: 2011, materiales: ['Algodón', 'Fique', 'Cuentas de vidrio'],
    bio: 'Tejo mochilas Wayúu desde que tengo memoria; mi abuela me enseñó los primeros nudos a los ocho años en el desierto de la Guajira. Cada mochila me toma entre 15 y 20 días de trabajo, tejida en telar tradicional con hilos de algodón teñidos con tintes que aprendí a preparar en mi comunidad. Para nosotras cada color y patrón cuenta una historia: el kanás representa el pensamiento y la vida de mi pueblo. Vender mis piezas me ha permitido sostener a mi familia y seguir enseñando el oficio a las mujeres jóvenes de mi ranchería.',
  },
  {
    id: 2, nombre: 'Carmen Vidal', region: 'El Carmen de Bolívar', ciudad: 'El Carmen de Bolívar',
    tipo: 'Sombreros vueltiao', rating: 4.9, resenas: 312, productos: 8, icono: '👒',
    avatar: '/assets/artesana-carmen-vidal-avatar.webp', portada: '/assets/artesana-carmen-vidal-portada.webp',
    anioInicio: 2008, materiales: ['Caña flecha'],
    bio: 'Soy tejedora de sombrero vueltiao desde hace más de 15 años en el norte de Bolívar, tierra donde nació esta tradición declarada Patrimonio Cultural Inmaterial. Trabajo la caña flecha desde que se cosecha hasta que se teje en las famosas "vueltas" que le dan el nombre a cada sombrero: entre más vueltas, más fino y más tiempo de trabajo. Un sombrero de 21 vueltas me puede tomar más de una semana de tejido diario. Cada pieza que sale de mis manos lleva el orgullo de mi región y de las mujeres que me enseñaron el oficio.',
  },
  {
    id: 3, nombre: 'Luis Castillo', region: 'Mompox, Bolívar', ciudad: 'Mompox',
    tipo: 'Filigrana de plata', rating: 4.6, resenas: 89, productos: 15, icono: '💍',
    avatar: '/assets/artesano-luis-castillo-avatar.webp', portada: '/assets/artesano-luis-castillo-portada.webp',
    anioInicio: 2015, materiales: ['Plata 950'],
    bio: 'Aprendí filigrana en los talleres familiares de Mompox, un oficio que llegó con los orfebres coloniales y que hoy es Patrimonio de la Humanidad UNESCO. Trabajo la plata 950 hilo por hilo, enrollando y soldando cada filamento a mano hasta formar figuras como mariposas, flores y peces, símbolos tradicionales del río Magdalena. Cada joya puede tomarme entre 3 y 10 días según su complejidad. Mantener vivo este oficio es también mantener viva la historia de mi ciudad.',
  },
  {
    id: 4, nombre: 'Rosa Noriega', region: 'Valledupar, Cesar', ciudad: 'Valledupar',
    tipo: 'Tejidos y tapices', rating: 4.7, resenas: 145, productos: 9, icono: '🎨',
    avatar: '/assets/artesana-rosa-noriega-avatar.webp', portada: '/assets/artesana-rosa-noriega-portada.webp',
    anioInicio: 2005, materiales: ['Algodón', 'Lana virgen'],
    bio: 'Tejo tapices y hamacas en telar horizontal desde hace casi 20 años en Valledupar, inspirándome en los colores y ritmos del folclor vallenato que escuché toda mi vida en mi casa. Cada tapiz nace de un boceto que dibujo antes de montar el telar, y puede tomarme entre una y tres semanas de tejido según el tamaño. Me acompañan dos aprendices a quienes les enseño el oficio, porque creo que un tejido solo tiene sentido si se sigue transmitiendo.',
  },
];

export const PEDIDOS: Pedido[] = [
  { id: 'PED-2026-001', producto: 'Mochila Wayúu Grande', comprador: 'Ana Rodríguez', ciudad: 'Bogotá', fecha: '2026-07-10', total: 185000, estado: 'Enviado' },
  { id: 'PED-2026-002', producto: 'Collar de Semillas Wayúu', comprador: 'Carlos Mejía', ciudad: 'Medellín', fecha: '2026-07-11', total: 55000, estado: 'En preparación' },
  { id: 'PED-2026-003', producto: 'Tapiz Caribe Multicolor', comprador: 'Luisa Gómez', ciudad: 'Cali', fecha: '2026-07-09', total: 165000, estado: 'Entregado' },
  { id: 'PED-2026-004', producto: 'Mochila Wayúu Grande', comprador: 'Pedro Vargas', ciudad: 'Barranquilla', fecha: '2026-07-12', total: 185000, estado: 'Recibido' },
  { id: 'PED-2026-005', producto: 'Collar de Semillas Wayúu', comprador: 'María López', ciudad: 'Santa Marta', fecha: '2026-07-08', total: 55000, estado: 'Entregado' },
];

export const RESENAS: Resena[] = [
  { autor: 'Ana Rodríguez', ciudad: 'Bogotá', rating: 5, comentario: 'Hermosa mochila, los colores son exactamente como en las fotos. El tejido es de altísima calidad. ¡Volveré a comprar!', producto: 'Mochila Wayúu Grande', fecha: 'Hace 2 días' },
  { autor: 'Carlos Mejía', ciudad: 'Medellín', rating: 5, comentario: 'Llegó en perfecto estado y antes del tiempo estimado. María es una artesana increíble, muy comunicativa.', producto: 'Collar de Semillas', fecha: 'Hace 1 semana' },
  { autor: 'Luisa Gómez', ciudad: 'Cali', rating: 4, comentario: 'Muy buena calidad, solo me gustaría más opciones de color disponibles. El empaque fue muy cuidadoso.', producto: 'Tapiz Caribe', fecha: 'Hace 2 semanas' },
];
