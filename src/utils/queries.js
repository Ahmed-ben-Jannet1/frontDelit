import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      userId
    }
  }
`;

export const REGISTER = gql`
  mutation createUser($email: String!, $name: String!, $password: String!) {
    createUser(userInput: { email: $email, name: $name, password: $password }) {
      _id
    }
  }
`;

export const CREATE_TASK = gql`
  mutation createPost($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      _id
      title
      content
      createdAt
      updatedAt
      creator {
        _id
        name
        email
      }
    }
  }
`;

export const UPDATE_STATUS = gql`
  mutation updateStatus($status: String!) {
    updateStatus(status: $status) {
      _id
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation updatePost($id: ID!, $title: String!, $content: String!) {
    updatePost(id: $id, title: $title, content: $content) {
      _id
    }
  }
`;

export const DELETE_TASK = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

export const MY_LIST = gql`
  query ($page: Int!) {
    posts(page: $page) {
      posts {
        _id
        title
        content
        creator {
          _id
          name
        }
        createdAt
        updatedAt
      }
      totalPages
    }
  }
`;

export const PROFILE = gql`
  {
    profile {
      _id
      name
      email
      status
    }
  }
`;
