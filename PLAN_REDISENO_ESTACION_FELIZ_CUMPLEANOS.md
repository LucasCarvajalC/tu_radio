# Plan de desarrollo: Rediseño visual exclusivo de la estación «Feliz cumpleaños papita»

## 1. Objetivo

Rediseñar **únicamente la experiencia visual de la estación de cumpleaños** de la radio web existente. Cuando se active la estación especial, el entorno debe transformarse en una celebración romántica, mágica y elegante: fondo rosa pastel, luces ambientales, partículas delicadas, fuegos artificiales ocasionales y una consola retro que parezca recibir reflejos de luz rosa.

El resultado debe sentirse como una escena diseñada de forma profesional, no como una acumulación de efectos. Cada elemento tendrá una función visual, una jerarquía y un lugar definido. La pantalla y el mensaje de cumpleaños deben seguir siendo el centro de atención.

El nombre que debe mostrarse en la pantalla durante el audio es:

**«Feliz cumpleaños papita»**

## 2. Alcance estricto

### Incluido
- Rediseño del fondo cuando la estación de cumpleaños esté activa.
- Paleta de colores pastel coordinada.
- Iluminación ambiental rosa/lavanda que afecte visualmente a la consola.
- Fuegos artificiales discretos mediante Canvas, detrás del estéreo.
- Partículas, destellos y pocos elementos decorativos flotantes.
- Tratamiento visual especial de la pantalla LCD.
- Presentación del título «Feliz cumpleaños papita».
- Ecualizador con colores de la celebración.
- Transiciones y microinteracciones específicas de esta estación.
- Estado visual final al terminar el mensaje, si la aplicación ya dispone de ese estado.
- Responsive, accesibilidad, rendimiento y pruebas visuales.

### Excluido
- Rediseñar las otras cuatro estaciones.
- Cambiar la carcasa o el diseño global fuera del estado de cumpleaños.
- Modificar el funcionamiento del audio, el mensaje de voz, su duración o su secuencia.
- Cambiar el sistema de selección de estaciones, el volumen, la pausa u otros controles funcionales.
- Añadir canciones, archivos de audio, APIs, backend o nuevas reglas de reproducción.
- Cambiar nombres o IDs de las estaciones.
- Convertir la radio en una imagen estática o una animación que no responda a la interfaz real.

**Regla fundamental:** el rediseño solo se activa cuando la estación especial de cumpleaños está seleccionada. Al salir de ella, todos los estilos, colores y efectos exclusivos deben desaparecer limpiamente y la radio debe volver a su apariencia anterior.

## 3. Dirección artística: «Pastel Dream Birthday»

### Concepto
Una celebración nocturna en tonos pastel, con la consola retro como objeto principal y una atmósfera rosa mágica alrededor.

La dirección visual combina:
- Rosa pastel como luz ambiental dominante.
- Lavanda y violeta suave para dar profundidad.
- Blanco cálido para destellos pequeños.
- Dorado pastel para los fuegos artificiales.
- Grafito oscuro y metal para preservar la identidad de la radio.
- Una pequeña cantidad de corazones y estrellas, nunca una lluvia de iconos.

### Sensación buscada
- Romántica, personal y tierna.
- Luminosa, pero no chillona.
- Animada, pero no caótica.
- Retro futurista, sin perder el aspecto físico del estéreo.
- Especial y memorable, sin parecer una plantilla infantil genérica.

### Regla de composición
La escena tendrá tres planos visuales claramente separados:

1. **Fondo lejano:** degradado rosa/lavanda y halo difuso.
2. **Plano ambiental:** partículas y fuegos artificiales ocasionales detrás del equipo.
3. **Primer plano:** la consola retro, sus controles y el mensaje.

No añadir globos, confeti, corazones, estrellas y fuegos artificiales con la misma intensidad al mismo tiempo. El sistema visual prioriza pocos efectos bien colocados y con tiempos diferentes.

## 4. Paleta de colores

Usar los siguientes valores como base; pueden ajustarse ligeramente para mejorar contraste en la implementación real.

| Token | Color | Uso |
|---|---|---|
| Rosa nube | `#F8C8E8` | Luz ambiental principal |
| Rosa pastel | `#F4A8D4` | Reflejos suaves y detalles |
| Rosa luminoso | `#FF83C8` | Acentos importantes |
| Rosa profundo | `#D95BA6` | Contraste de acentos |
| Lavanda | `#C9B8FF` | Luz secundaria |
| Violeta suave | `#9C8BE8` | Profundidad y sombras coloreadas |
| Blanco cálido | `#FFF5FB` | Destellos y texto luminoso |
| Dorado pastel | `#FFE0A3` | Fuegos artificiales y estrellas |
| Fondo base | `#100B16` | Fondo oscuro bajo la atmósfera |
| Fondo rosa oscuro | `#211326` | Transición entre el fondo base y los halos |
| Pantalla LCD | `#0B101B` | Mantener legibilidad y estética retro |
| Texto principal | `#FFF8FC` | Títulos y mensajes |
| Texto secundario | `#E1CDE0` | Etiquetas secundarias |
| Metal original | Según estilos actuales | Conservar material de la consola |

### Proporción visual recomendada
- 70 %: base oscura, rosa muy suave y áreas de descanso visual.
- 20 %: lavanda y rosa pastel como iluminación.
- 8 %: rosa luminoso en puntos importantes.
- 2 %: blanco cálido y dorado en destellos.

Estos porcentajes son una guía visual, no un cálculo exacto de píxeles.

### Reglas de color
- No teñir toda la interfaz de rosa saturado.
- La consola conserva su base grafito.
- Los reflejos rosa y lavanda aparecen en bordes, sombras y zonas orientadas hacia la fuente de luz.
- Mantener el texto legible; no colocar texto blanco directamente sobre un destello.
- El dorado se reserva para pequeñas explosiones y detalles, no para grandes superficies.
- Evitar usar muchos tonos adicionales fuera de la paleta.

## 5. Diseño del fondo

### 5.1 Fondo base
Crear un fondo con un degradado oscuro y suave entre ciruela, rosa profundo y violeta nocturno. El centro detrás de la radio debe tener un halo rosa pastel más claro, mientras los bordes quedan más oscuros.

El fondo debe tener profundidad y suavidad; no utilizar una imagen plana rosa chillón.

### 5.2 Halo ambiental
Crear dos o tres zonas de luz difusa:
- Halo principal rosa detrás del centro de la consola.
- Halo lavanda secundario, desplazado ligeramente hacia un lateral.
- Un resplandor tenue en la zona inferior, como luz reflejada sobre el tablero.

Los halos cambian lentamente de intensidad y tamaño. Su movimiento debe ser tan suave que se perciba como iluminación ambiental, no como manchas que se mueven.

### 5.3 Partículas luminosas
Añadir partículas pequeñas y escasas que floten despacio. Variar tamaño, opacidad y velocidad dentro de límites controlados.

Reglas:
- Mantener una densidad baja o media-baja.
- Distribuirlas por el fondo, evitando concentrarlas alrededor del título.
- Variar ligeramente las trayectorias para que no parezcan una cuadrícula.
- Usar principalmente rosa pálido, lavanda y blanco cálido.
- Las partículas aparecen y desaparecen gradualmente.
- No hacer que todas suban a la misma velocidad o desaparezcan a la vez.

### 5.4 Fuegos artificiales con Canvas
Utilizar un único Canvas de fondo para dibujar fuegos artificiales pastel ocasionales.

Comportamiento:
- Lanzamientos o expansiones discretos en distintas zonas del fondo.
- Explosiones pequeñas y medianas de partículas rosas, lavanda y dorado pastel.
- La explosión se expande, pierde opacidad y desaparece suavemente.
- Los eventos se espacian para que no haya varias explosiones grandes simultáneas.
- El área central ocupada por la radio y el texto debe tener prioridad visual; las explosiones se colocan preferentemente en los laterales y esquinas.
- Las partículas no deben cubrir los controles ni reducir la legibilidad.

El Canvas debe:
- Tener `pointer-events: none`.
- Estar detrás de la consola mediante un orden de capas explícito.
- Adaptar su resolución al tamaño del viewport y gestionar el escalado para pantallas de alta densidad.
- Ajustar su tamaño cuando cambie la ventana.
- Limitar el número de partículas activas.
- Usar un solo ciclo de animación mientras esté activo.
- Cancelar `requestAnimationFrame` y limpiar recursos al desmontarse o desactivarse.
- No crear intervalos o ciclos duplicados tras entrar y salir de la estación varias veces.

Los fuegos artificiales son ornamentales. No representan el análisis de audio ni deben conectarse a la lógica de reproducción.

### 5.5 Decoración opcional
Se permite un número muy reducido de estrellas de cuatro puntas o corazones pequeños, de manera ocasional.

- Priorizar estrellas y destellos por encima de emojis grandes.
- Si se usan corazones, que sean pequeños, con opacidad baja y lejos del título.
- No usar una lluvia constante de confeti.
- No poner globos grandes delante de la radio.
- No añadir textos decorativos aleatorios.

La decoración opcional se implementa solo si mejora la composición en la pantalla real. Si compite con el equipo, debe eliminarse.

## 6. Iluminación de la consola

La consola debe parecer iluminada por una fuente rosa suave situada a cierta distancia. No debe perder su material metálico oscuro.

### 6.1 Carcasa
- Conservar el gradiente y la textura originales.
- Añadir un reflejo rosa difuso en el borde superior y los laterales.
- Añadir un reflejo lavanda muy leve en el lado opuesto para dar volumen.
- Aplicar una sombra ambiental rosa debajo del equipo, como luz reflejada sobre el tablero.
- Mantener las zonas negras suficientemente oscuras para conservar contraste.

### 6.2 Marco de pantalla
- Mantener el bisel metálico.
- Añadir un halo rosa exterior muy suave.
- Usar una línea de reflejo fino, no un borde rosa sólido y grueso.
- La intensidad debe ser menor que la del título principal.

### 6.3 Perilla TUNE
- Conservar su apariencia metálica.
- Aplicar un reflejo rosa muy discreto en un lado del aro.
- El indicador puede tener un brillo rosa cálido, siempre que no contradiga la identidad actual de la perilla.
- No hacerla girar ni crear interacciones funcionales nuevas.

### 6.4 Botón POWER y controles
- Cambiar los acentos de los botones a rosa pastel o lavanda mientras la estación de cumpleaños esté activa.
- Mantener texto e iconos legibles.
- Evitar que todos los botones brillen con la misma intensidad.
- Dar mayor protagonismo solo a los controles que estén activos según el estado real.

### 6.5 Límites de iluminación
- Usar sombras y gradientes CSS de bajo contraste.
- Evitar `box-shadow` muy grandes y saturadas en todos los elementos.
- Evitar filtros intensos que cambien el aspecto de todos los hijos.
- No aplicar un filtro rosa global a toda la radio: eso decolora textos e iconos.
- La iluminación debe simularse en la carcasa y los bordes mediante capas o pseudo-elementos, sin bloquear interacciones.

## 7. Pantalla LCD: mensaje principal

### 7.1 Texto
Durante el audio de cumpleaños, la pantalla debe mostrar exactamente:

**Feliz cumpleaños papita**

No reemplazarlo por «Happy Birthday», «Feliz cumpleaños» sin el apodo ni otros textos alternativos.

### 7.2 Jerarquía
La pantalla mantiene la identidad de estéreo retro y presenta:
1. Etiqueta pequeña: `RADIO ESPECIAL` o `MENSAJE ESPECIAL`.
2. Título principal: `Feliz cumpleaños papita`.
3. Indicador secundario: `UN MENSAJE HECHO PARA TI`.
4. Ecualizador decorativo o indicador de reproducción ya existente.
5. Estado real del reproductor, si ya se muestra en la interfaz.

No añadir información inventada como duración, número de pista o estado de reproducción si la aplicación no dispone de ella.

### 7.3 Tratamiento tipográfico
- Título con tipografía clara, ligeramente redondeada o geométrica, sin perder la estética LCD.
- Blanco cálido como color principal.
- Resplandor rosa muy fino, con suficiente contraste.
- El apodo «papita» puede recibir un acento rosa más luminoso, siempre que el nombre completo se lea como una unidad.
- Etiquetas técnicas pequeñas y espaciadas.
- No usar una fuente cursiva ornamental para el texto principal de la radio.

### 7.4 Animación de entrada
Cuando el estado real indique que comienza el mensaje:
1. El título aparece mediante una transición de opacidad y un desplazamiento vertical muy pequeño.
2. Un destello corto recorre una parte del borde de la pantalla.
3. El corazón o estrella decorativa aparece junto al título.
4. La pantalla queda estable durante el mensaje.

La animación debe ser breve, no reiniciarse continuamente y no retrasar el audio.

### 7.5 Durante el audio
- Mantener el título visible.
- No hacer parpadear el texto.
- No desplazarlo constantemente.
- No mostrar títulos de canciones sobre el mensaje.
- Evitar que fuegos artificiales o partículas se dibujen dentro de la pantalla.
- Si ya existe un indicador de reproducción, conservarlo y adaptarlo visualmente.

## 8. Ecualizador y señales de actividad

- Usar rosa pastel, lavanda y dorado en una combinación limitada.
- Mantener la forma y el espacio disponibles en la pantalla.
- Variar alturas de barras con una animación suave.
- No utilizar un arcoíris completo.
- Mantener un ritmo visual calmado que complemente las partículas del fondo.

Conectar la animación al estado visual que ya existe:
- Mensaje reproduciéndose: barras animadas con intensidad moderada.
- Pausa: barras detenidas o atenuadas, si existe pausa.
- Estación no activa: restaurar el aspecto original.
- Mensaje finalizado: dejar las barras quietas o mostrar el cierre visual existente.

Si las barras no leen la señal de audio real, deben entenderse como decoración; no simular una sincronización exacta.

## 9. Secuencia visual de la experiencia

La experiencia debe tener una jerarquía temporal clara. Los efectos no deben empezar todos a la vez ni competir entre sí.

### Fase A — Entrada a la estación
Duración visual aproximada: 700–1200 ms.
- El fondo transiciona hacia rosa pastel y lavanda.
- Aparecen los halos ambientales.
- La carcasa empieza a recibir reflejos rosa suaves.
- El Canvas se activa y muestra partículas de baja densidad.
- La radio y los controles conservan su posición.

No bloquear clics, audio ni interacción durante esta transición.

### Fase B — Presentación del mensaje
Duración visual aproximada: 400–800 ms, independiente de la secuencia funcional del audio.
- Aparece el título «Feliz cumpleaños papita».
- Se muestra la etiqueta de mensaje especial.
- Un destello sutil destaca el marco.
- Puede ocurrir una única explosión pequeña de estrellas en un lateral.

No iniciar ni retrasar el audio desde la animación.

### Fase C — Mientras suena el audio
- Los halos pulsan lentamente.
- Las partículas flotan sin prisa.
- Puede aparecer un fuego artificial pequeño cada cierto intervalo, con variación temporal.
- La pantalla se mantiene estable.
- El ecualizador tiene movimiento moderado.
- No lanzar una explosión grande sobre cada evento de audio.

### Fase D — Final del mensaje
Solo si la aplicación ya identifica el final del mensaje:
- Mostrar una última explosión de estrellas rosas y doradas en los laterales.
- Hacer que las partículas se desvanezcan parcialmente.
- Conservar la dedicatoria visible en la pantalla.
- Mantener una escena de cierre suave, sin iniciar audio nuevo ni alterar los controles.

Si no existe un estado final accesible, no inventar una lógica nueva de audio para detectarlo. En ese caso, mantener el fondo de cumpleaños activo mientras la estación siga seleccionada.

## 10. Arquitectura visual sugerida

Inspeccionar la estructura real antes de decidir qué archivos editar. Mantener el diseño y la arquitectura existentes siempre que sea posible.

La composición puede organizarse conceptualmente en estas capas:

1. `BirthdayBackground`: degradado base y halos.
2. `BirthdayParticles`: partículas flotantes.
3. `BirthdayFireworksCanvas`: fuegos artificiales.
4. `RadioConsole`: estéreo existente, conservado como primer plano.
5. `BirthdayScreenTreatment`: variaciones visuales de la pantalla.
6. `BirthdayDecorations`: pequeños destellos opcionales.

No es obligatorio crear un componente por capa si puede integrarse limpiamente en los componentes actuales. Evitar fragmentar demasiado una función visual sencilla.

### Orden de capas
Usar un orden `z-index` explícito:
- Fondo base al nivel más bajo.
- Halos y partículas por encima del fondo.
- Canvas de fuegos artificiales detrás de la radio.
- Consola en primer plano.
- Controles interactivos en su orden habitual.
- No colocar elementos decorativos por encima de botones o texto.

Todos los elementos puramente ornamentales deben usar `pointer-events: none`.

### Activación y limpieza
- Usar el ID real de la estación especial para determinar si el tema está activo.
- No comparar etiquetas visibles que puedan cambiar.
- No crear una segunda máquina de estados.
- No modificar el estado funcional del reproductor.
- Al abandonar la estación, retirar las clases del tema y detener el Canvas.
- Limpiar el ciclo de animación, listeners de resize y recursos.
- Evitar que las clases de cumpleaños se filtren a otras estaciones.

## 11. Variables CSS sugeridas

Adaptar estos tokens al sistema de estilos actual y mantenerlos encapsulados para el tema de cumpleaños.

```css
.birthday-theme {
  --birthday-pink: #f8c8e8;
  --birthday-pink-strong: #ff83c8;
  --birthday-pink-deep: #d95ba6;
  --birthday-lavender: #c9b8ff;
  --birthday-violet: #9c8be8;
  --birthday-white: #fff5fb;
  --birthday-gold: #ffe0a3;
  --birthday-bg: #100b16;
  --birthday-bg-mid: #211326;
}
```

Usar selectores acotados a la estación de cumpleaños. No sobrescribir globalmente los colores del resto de la radio.

## 12. Responsive

### Escritorio
- Mantener el estéreo como elemento central.
- Distribuir las luces en los márgenes y detrás de la carcasa.
- Reservar el área central para la consola y el mensaje.
- Los fuegos artificiales pueden ser algo más amplios, sin invadir la pantalla.

### Tableta
- Reducir la densidad de partículas y el tamaño de los halos.
- Recolocar las explosiones para no quedar detrás de controles pequeños.
- Conservar la jerarquía del título.

### Móvil
- Adaptar el Canvas al viewport y evitar desbordamiento horizontal.
- Reducir la cantidad de partículas y la frecuencia de fuegos artificiales.
- Mantener título y controles legibles.
- Evitar globos o decoración que tape el equipo.
- El fondo no debe aumentar el scroll ni cambiar la posición de los controles.

## 13. Accesibilidad y rendimiento

- Respetar `prefers-reduced-motion: reduce`: desactivar fuegos artificiales y reducir pulsos/partículas a un estado estático o casi estático.
- No usar destellos rápidos ni flashes blancos.
- Mantener contraste del título y controles.
- No transmitir estado únicamente mediante color.
- No capturar eventos de ratón o táctiles con el Canvas.
- Limitar la cantidad de partículas.
- Usar un solo `requestAnimationFrame` por Canvas activo.
- Pausar animación cuando el componente no esté visible o cuando el navegador permita detectar esa condición sin añadir complejidad innecesaria.
- No utilizar vídeo pesado ni bibliotecas de partículas grandes para un efecto que puede hacerse con Canvas.
- Evitar cálculos costosos en cada render de React.
- No actualizar el estado React por cada fotograma.
- Verificar el rendimiento en un equipo de especificaciones medias.

## 14. Fases de implementación

### Fase 1 — Inspección
1. Localizar la estación de cumpleaños y su ID.
2. Identificar los componentes del fondo y de la consola.
3. Determinar qué estado real indica estación seleccionada, mensaje en reproducción y mensaje finalizado.
4. Identificar estilos que puedan reutilizarse.
5. Tomar capturas de referencia.

**Resultado:** plan de edición concreto sin tocar el audio.

### Fase 2 — Tema de cumpleaños
1. Crear tokens de color encapsulados.
2. Activar una clase o atributo de tema basado en el ID real.
3. Implementar fondo, degradado y halos.
4. Confirmar que las otras estaciones no cambian.

### Fase 3 — Canvas y partículas
1. Implementar un Canvas ligero para fuegos artificiales.
2. Añadir partículas discretas.
3. Definir límites de densidad, frecuencia, tamaño y velocidad.
4. Añadir limpieza completa y soporte para movimiento reducido.
5. Comprobar que no bloquee interacciones.

### Fase 4 — Iluminación del estéreo
1. Aplicar reflejos rosa y lavanda a la carcasa.
2. Mejorar el halo del marco de pantalla.
3. Ajustar perilla, POWER y controles con acentos suaves.
4. Evitar un filtro rosa global.

### Fase 5 — Pantalla de cumpleaños
1. Mostrar «Feliz cumpleaños papita».
2. Establecer jerarquía de título y etiquetas.
3. Crear entrada visual breve.
4. Adaptar ecualizador y estados existentes.
5. Mantener la pantalla estable durante el audio.

### Fase 6 — Secuencia y cierre visual
1. Sincronizar las clases visuales con los estados existentes.
2. Distribuir los efectos en el tiempo para evitar saturación.
3. Si existe el estado final, añadir un cierre visual corto.
4. Confirmar que no se afecta la secuencia funcional del audio.

### Fase 7 — Responsive y accesibilidad
1. Ajustar densidad y escala por tamaño de pantalla.
2. Revisar contraste.
3. Probar movimiento reducido.
4. Confirmar foco y controles accesibles.

### Fase 8 — Revisión final
1. Comparar capturas antes/después.
2. Reducir cualquier efecto que compita con la pantalla.
3. Revisar rendimiento y consola.
4. Probar entrar, salir y volver a entrar a la estación varias veces.
5. Confirmar que no haya Canvas ni clases duplicadas.

## 15. Pruebas de aceptación

### Alcance
- [ ] El tema especial solo aparece en la estación de cumpleaños.
- [ ] Las otras estaciones conservan exactamente su estilo anterior.
- [ ] La lógica y la secuencia de audio no cambian.

### Composición
- [ ] El fondo rosa pastel y lavanda se ve coherente.
- [ ] La radio continúa siendo el foco principal.
- [ ] El resultado no parece un collage de efectos.
- [ ] Hay áreas tranquilas sin decoración para descansar la vista.
- [ ] Ninguna decoración cubre la pantalla o los controles.

### Animaciones
- [ ] Los halos cambian de intensidad suavemente.
- [ ] Las partículas tienen baja densidad y movimientos variados.
- [ ] Los fuegos artificiales aparecen ocasionalmente, no continuamente.
- [ ] No hay varias explosiones grandes simultáneas.
- [ ] Los efectos no producen parpadeo molesto.
- [ ] Movimiento reducido desactiva o reduce los efectos.

### Consola
- [ ] La carcasa recibe reflejos rosa y lavanda, pero conserva su material oscuro.
- [ ] El marco de pantalla tiene un halo controlado.
- [ ] Los botones mantienen legibilidad.
- [ ] No hay un filtro que decolore todos los elementos.

### Pantalla
- [ ] Aparece exactamente «Feliz cumpleaños papita».
- [ ] El título permanece visible durante el audio.
- [ ] La pantalla no se llena de efectos.
- [ ] El ecualizador utiliza la paleta pastel.
- [ ] No se inventan datos funcionales.

### Técnica
- [ ] Canvas detrás de la radio y con `pointer-events: none`.
- [ ] Se cancela `requestAnimationFrame` al desactivar/desmontar.
- [ ] No hay listeners o animaciones duplicados tras reingresar.
- [ ] No hay scroll horizontal en móvil.
- [ ] No hay errores nuevos en consola.
- [ ] La radio sigue siendo interactiva.
- [ ] No se añadieron dependencias innecesarias.

## 16. Criterio visual de calidad

El rediseño solo se considera terminado cuando cumple estas condiciones:

1. Al entrar en cumpleaños, se percibe un cambio emocional inmediato, pero suave.
2. El rosa pastel y la lavanda envuelven la consola en lugar de competir con ella.
3. Los fuegos artificiales son un detalle ocasional de fondo.
4. La pantalla con «Feliz cumpleaños papita» es el foco más importante.
5. El estéreo conserva su identidad retro y recibe reflejos creíbles.
6. Todos los efectos están organizados por capas, intensidad y ritmo.
7. La escena se ve bonita tanto quieta como animada.
8. Al salir de cumpleaños, la aplicación vuelve a su apariencia normal sin residuos visuales.

## 17. Instrucciones finales para el agente de programación

- Lee el código actual antes de cambiarlo; no asumas rutas o nombres de componentes.
- Implementa exclusivamente este rediseño de cumpleaños.
- No modifiques audio, reproducción, eventos `ended`, selección aleatoria ni secuencias.
- No rediseñes globalmente el estéreo ni las demás estaciones.
- Usa CSS para la iluminación y un Canvas ligero para los fuegos artificiales.
- Prioriza composición, contraste y ritmo visual por encima de la cantidad de efectos.
- No añadas decoración que no tenga un lugar claro.
- Si un efecto no mejora la composición, no lo implementes.
- No instales una biblioteca externa salvo que sea estrictamente necesaria.
- Prueba los estados de cumpleaños, la salida de esa estación y el reingreso.
- Al finalizar, resume archivos modificados, efectos implementados y pruebas realizadas.

## Resultado esperado

Una estación de cumpleaños con fondo rosa pastel y lavanda, luces ambientales que respiran lentamente, fuegos artificiales pequeños y espaciados, partículas luminosas discretas y reflejos rosa realistas sobre el estéreo retro. En la pantalla, «Feliz cumpleaños papita» permanece claro y protagonista mientras suena el mensaje. La escena debe sentirse íntima, mágica, coherente y cuidadosamente diseñada: **mucho encanto visual, pero ningún desorden**.
