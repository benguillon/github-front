/**
 * Server Mutation Query
 */

'use strict';

import gql from 'graphql-tag';

export const getReposLanguages = gql`
query Organization($login:String){
  Organization(login: $login)
  {
    name
    login
    avatar_url
    members {
      login
      repos {
        name
        languages {
          name
        }
        stars
      }
    }
  repos{
    name
    stars
    created_at
    languages {
      name
    }
  }
  }
}`;

export const addUser = gql`
  mutation addUser($name: String!) {
    addUser(name: $name) {
      id
      name
    }
  }`;

export const getUsers = gql`
  query {
    users{
      id
      name
    }
  }`;

export const removeUser = gql`
  mutation removeUser($id: String!) {
    removeUser(id: $id) {
      id
      name
    }
  }`;

export const updateUser = gql`
  mutation updateUser($id: String!, $name: String!) {
    updateUser(id: $id, name: $name) {
      id
      name
    }
  }`;
