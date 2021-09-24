// функция - конструктор новых форм
// на входе: местоимение, массив окончаний, основание слова
function help(prn, arr, newBase) {
  let newRes = ''
  switch (prn) {
    case 'я':
      newRes = newBase + arr[0] // у ю 
      break;
    case 'ты':
      newRes = newBase + arr[1]
      break;
    case 'мы':
      newRes = newBase + arr[2]
      break;
    case 'вы':
      newRes = newBase + arr[3]
        break;
    case 'он':
    case 'она':
      newRes = newBase + arr[4]
        break;
    case 'они':
      newRes = newBase + arr[5]
        break;
    default:
      alert( "something is wrong" );
  }
  return newRes
}

function conjugationOfVerbs(verb, pronoun) {
  const vrb = verb.toLocaleLowerCase()
  const prn = pronoun.toLocaleLowerCase()
  let res = ''

  const base = vrb.split('').splice(0, vrb.length-2).join('')
  const shortBase = vrb.split('').splice(0, vrb.length-3).join('')

  console.log(`${vrb} + ${prn} =`)
  
  // проверка на неверные данные
  if (typeof pronoun !== 'string' || typeof verb !== 'string') {
      return 'not string'
  }
  if(pronoun.length === 0 || verb.length === 0 ) {
      return  'too short'
  }
  
  // includes для обработки однокоренных слов с приставками
  // общие исключения
  if (vrb.includes('есть')) { 
      return res = help(prn,['ем', 'ешь', 'едим', 'едите', 'ест', 'едят'], '')
  }

  if (vrb.includes('дать')) {
      return res = help(prn,['даю', 'даёшь', 'даём', 'даёте', 'даёт', 'дают'], '')
  }

  if (vrb.includes('гнать')) {
      return res = help(prn,['гоню', 'гонишь', 'гоним', 'гоните', 'гонит', 'гонят'], '')
  }
  
  // первое спряжение общий случай
  // окончания варьируются, не получилось вывести закономерность, чтобы обработать абсолютно все варианты
  // у - ю    ут - ют     ат - ят
  // так же в некоторых местах необходимо заменять 2 последние буквы, а в некоторых 3
  // этот функционал недоработан
  if ((vrb.includes('еть')  || vrb.includes('ать') 
  || vrb.includes('ять') || vrb.includes('оть') 
  || vrb.includes('уть') || vrb.includes('ыть')) && (
  vrb != 'вертеть' && vrb != 'видеть' && vrb != 'зависеть' && 
  vrb != 'ненавидеть' && vrb != 'обидеть' && vrb != 'смотреть' &&
  vrb != 'терпеть' && vrb != 'держать' && vrb != 'слышать' && 
  vrb != 'дышать')) {
      return res = help(prn,['ю', 'ешь', 'ем', 'ете', 'ет', 'ют'], base) 
  }

  // исключения: вертеть, видеть, зависеть, ненавидеть, обидеть, смотреть, терпеть, держать, слышать, дышать
  if (vrb === 'вертеть' || vrb === 'видеть' || vrb === 'зависеть' || 
  vrb ==='ненавидеть' || vrb === 'обидеть' ||vrb === 'смотреть' ||
  vrb === 'терпеть' || vrb === 'держать' || vrb === 'слышать' || 
  vrb === 'дышать') {
      return res = help(prn,['ю', 'ишь', 'им', 'ите', 'ит', 'ат'], shortBase) 
  }

  // второе спряжение общий случай
  if (vrb.includes('ить') && (!vrb.includes('брить') || vrb.includes('стелить'))) {
      return res = help(prn,['ю', 'ишь', 'им', 'ите', 'ит', 'ят'], shortBase) 
  }

  // исключения: брить стелить
  if (vrb.includes('брить') || vrb.includes('стелить')) {
      return res = help(prn,['ю', 'шь', 'ем', 'ете', 'ет', 'ют'], shortBase + 'е') 
  }

  if (vrb.includes('стелить')) {
      return res = help(prn,['ю', 'ешь', 'ем', 'ете', 'ет', 'ят'], shortBase ) 
  }
  return res
}

console.log(conjugationOfVerbs('гнать', 43)) // 'not string'
console.log(conjugationOfVerbs('', 'мы')) // 'too short'

console.log(conjugationOfVerbs('есть', 'мы')) 
console.log(conjugationOfVerbs('дать', 'они')) 
console.log(conjugationOfVerbs('гнать', 'я')) 
 
console.log(conjugationOfVerbs('прыгать', 'они')) 
console.log(conjugationOfVerbs('делать', 'они')) 
console.log(conjugationOfVerbs('веселеть', 'мы')) 

console.log(conjugationOfVerbs('любить', 'вы')) 
console.log(conjugationOfVerbs('хвалить', 'я')) 
console.log(conjugationOfVerbs('казнить', 'он')) 

console.log(conjugationOfVerbs('брить', 'я')) 
console.log(conjugationOfVerbs('стелить', 'он')) 

console.log(conjugationOfVerbs('вертеть', 'вы')) 
console.log(conjugationOfVerbs('видеть', 'она')) 
console.log(conjugationOfVerbs('зависеть', 'мы'))
console.log(conjugationOfVerbs('ненавидеть', 'он')) 
console.log(conjugationOfVerbs('обидеть', 'мы'))
console.log(conjugationOfVerbs('смотреть', 'я')) 
console.log(conjugationOfVerbs('терпеть', 'она')) 
console.log(conjugationOfVerbs('держать', 'они')) 
console.log(conjugationOfVerbs('слышать', 'вы')) 
console.log(conjugationOfVerbs('дышать', 'мы'))
