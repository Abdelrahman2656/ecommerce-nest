import * as bcrypt from 'bcrypt'
export function hash(password:string , saltRound : number = Number(process.env.SALTROUND || 10)):string | undefined{
    return bcrypt.hashSync(password , saltRound)
}
//compare
export const compare = (password:string , hashPassword:string):boolean=>{
return bcrypt.compareSync(password,hashPassword)
}