import app from './app';
import './database/connection'


app.listen(app.get('port'));
console.log('Server on PORT 3000')



