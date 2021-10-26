import React from 'react'
import Client from '../DataBase'
import { indexName,docType } from '../../config'
import Db from '../DataBase'
export default function Registraion() {
    Db.index({
      index: indexName,
      type: docType,
      refresh: true,
      body: ({
          name:"aryan",
          email:"araj60988@gmail.com",
          password:"Raj@6098",
          confirm_password:"Raj@6098"
      }),
    })
    .then(
      function (resp) {
        console.log("index is created ", resp);
      },
      function (err) {
        console.log(err.message);
      }
    );
    return (
        <div>
            
        </div>
    )
}
