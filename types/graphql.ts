import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Decimal: { input: any; output: any; }
};

export type BoolFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['Boolean']['input']>;
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type Comment = {
  __typename?: 'Comment';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  rating?: Maybe<Scalars['Decimal']['output']>;
  resourceId: Scalars['Int']['output'];
  resourceType: ResourceType;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};

export type CommentCreateManyUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  rating?: InputMaybe<Scalars['Decimal']['input']>;
  resourceId: Scalars['Int']['input'];
  resourceType: ResourceType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CommentCreateManyUserInputEnvelope = {
  data: Array<CommentCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CommentCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<CommentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CommentCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<CommentCreateWithoutUserInput>>;
  createMany?: InputMaybe<CommentCreateManyUserInputEnvelope>;
};

export type CommentCreateOrConnectWithoutUserInput = {
  create: CommentCreateWithoutUserInput;
  where: CommentWhereUniqueInput;
};

export type CommentCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description: Scalars['String']['input'];
  rating?: InputMaybe<Scalars['Decimal']['input']>;
  resourceId: Scalars['Int']['input'];
  resourceType: ResourceType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CommentListRelationFilter = {
  every?: InputMaybe<CommentWhereInput>;
  none?: InputMaybe<CommentWhereInput>;
  some?: InputMaybe<CommentWhereInput>;
};

export type CommentWhereInput = {
  AND?: InputMaybe<Array<CommentWhereInput>>;
  NOT?: InputMaybe<Array<CommentWhereInput>>;
  OR?: InputMaybe<Array<CommentWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  rating?: InputMaybe<DecimalNullableFilter>;
  resourceId?: InputMaybe<IntFilter>;
  resourceType?: InputMaybe<EnumResourceTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<IntFilter>;
};

export type CommentWhereUniqueInput = {
  AND?: InputMaybe<Array<CommentWhereInput>>;
  NOT?: InputMaybe<Array<CommentWhereInput>>;
  OR?: InputMaybe<Array<CommentWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  rating?: InputMaybe<DecimalNullableFilter>;
  resourceId?: InputMaybe<IntFilter>;
  resourceType?: InputMaybe<EnumResourceTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<IntFilter>;
};

export type Community = {
  __typename?: 'Community';
  _count: CommunityCount;
  cookbooks?: Maybe<Array<Cookbook>>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  recipes?: Maybe<Array<Recipe>>;
  user: User;
  userId: Scalars['Int']['output'];
};

export type CommunityCount = {
  __typename?: 'CommunityCount';
  cookbooks: Scalars['Int']['output'];
  recipes: Scalars['Int']['output'];
};

export type CommunityCreateManyUserInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
};

export type CommunityCreateManyUserInputEnvelope = {
  data: Array<CommunityCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CommunityCreateNestedManyWithoutCookbooksInput = {
  connect?: InputMaybe<Array<CommunityWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CommunityCreateOrConnectWithoutCookbooksInput>>;
  create?: InputMaybe<Array<CommunityCreateWithoutCookbooksInput>>;
};

export type CommunityCreateNestedManyWithoutRecipesInput = {
  connect?: InputMaybe<Array<CommunityWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CommunityCreateOrConnectWithoutRecipesInput>>;
  create?: InputMaybe<Array<CommunityCreateWithoutRecipesInput>>;
};

export type CommunityCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<CommunityWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CommunityCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<CommunityCreateWithoutUserInput>>;
  createMany?: InputMaybe<CommunityCreateManyUserInputEnvelope>;
};

export type CommunityCreateOrConnectWithoutCookbooksInput = {
  create: CommunityCreateWithoutCookbooksInput;
  where: CommunityWhereUniqueInput;
};

export type CommunityCreateOrConnectWithoutRecipesInput = {
  create: CommunityCreateWithoutRecipesInput;
  where: CommunityWhereUniqueInput;
};

export type CommunityCreateOrConnectWithoutUserInput = {
  create: CommunityCreateWithoutUserInput;
  where: CommunityWhereUniqueInput;
};

export type CommunityCreateWithoutCookbooksInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  recipes?: InputMaybe<RecipeCreateNestedManyWithoutCommunitiesInput>;
  user: UserCreateNestedOneWithoutCommunitiesInput;
};

export type CommunityCreateWithoutRecipesInput = {
  cookbooks?: InputMaybe<CookbookCreateNestedManyWithoutCommunitiesInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  user: UserCreateNestedOneWithoutCommunitiesInput;
};

export type CommunityCreateWithoutUserInput = {
  cookbooks?: InputMaybe<CookbookCreateNestedManyWithoutCommunitiesInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  recipes?: InputMaybe<RecipeCreateNestedManyWithoutCommunitiesInput>;
};

export type CommunityListRelationFilter = {
  every?: InputMaybe<CommunityWhereInput>;
  none?: InputMaybe<CommunityWhereInput>;
  some?: InputMaybe<CommunityWhereInput>;
};

export type CommunityWhereInput = {
  AND?: InputMaybe<Array<CommunityWhereInput>>;
  NOT?: InputMaybe<Array<CommunityWhereInput>>;
  OR?: InputMaybe<Array<CommunityWhereInput>>;
  cookbooks?: InputMaybe<CookbookListRelationFilter>;
  description?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  recipes?: InputMaybe<RecipeListRelationFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<IntFilter>;
};

export type CommunityWhereUniqueInput = {
  AND?: InputMaybe<Array<CommunityWhereInput>>;
  NOT?: InputMaybe<Array<CommunityWhereInput>>;
  OR?: InputMaybe<Array<CommunityWhereInput>>;
  cookbooks?: InputMaybe<CookbookListRelationFilter>;
  description?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  recipes?: InputMaybe<RecipeListRelationFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<IntFilter>;
};

export type Cookbook = {
  __typename?: 'Cookbook';
  _count: CookbookCount;
  communities?: Maybe<Array<Community>>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isMainCookbook: Scalars['Boolean']['output'];
  isPublic: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  rating?: Maybe<Scalars['Decimal']['output']>;
  ratingsCount: Scalars['Int']['output'];
  recipes?: Maybe<Array<Recipe>>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};

export type CookbookCount = {
  __typename?: 'CookbookCount';
  communities: Scalars['Int']['output'];
  recipes: Scalars['Int']['output'];
};

export type CookbookCreateInput = {
  communities?: InputMaybe<CommunityCreateNestedManyWithoutCookbooksInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isMainCookbook?: InputMaybe<Scalars['Boolean']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  rating?: InputMaybe<Scalars['Decimal']['input']>;
  ratingsCount?: InputMaybe<Scalars['Int']['input']>;
  recipes?: InputMaybe<RecipeCreateNestedManyWithoutCookbookInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutCookbooksInput;
};

export type CookbookCreateManyUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  isMainCookbook?: InputMaybe<Scalars['Boolean']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  rating?: InputMaybe<Scalars['Decimal']['input']>;
  ratingsCount?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CookbookCreateManyUserInputEnvelope = {
  data: Array<CookbookCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CookbookCreateNestedManyWithoutCommunitiesInput = {
  connect?: InputMaybe<Array<CookbookWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CookbookCreateOrConnectWithoutCommunitiesInput>>;
  create?: InputMaybe<Array<CookbookCreateWithoutCommunitiesInput>>;
};

export type CookbookCreateNestedManyWithoutRecipesInput = {
  connect?: InputMaybe<Array<CookbookWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CookbookCreateOrConnectWithoutRecipesInput>>;
  create?: InputMaybe<Array<CookbookCreateWithoutRecipesInput>>;
};

export type CookbookCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<CookbookWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CookbookCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<CookbookCreateWithoutUserInput>>;
  createMany?: InputMaybe<CookbookCreateManyUserInputEnvelope>;
};

export type CookbookCreateOrConnectWithoutCommunitiesInput = {
  create: CookbookCreateWithoutCommunitiesInput;
  where: CookbookWhereUniqueInput;
};

export type CookbookCreateOrConnectWithoutRecipesInput = {
  create: CookbookCreateWithoutRecipesInput;
  where: CookbookWhereUniqueInput;
};

export type CookbookCreateOrConnectWithoutUserInput = {
  create: CookbookCreateWithoutUserInput;
  where: CookbookWhereUniqueInput;
};

export type CookbookCreateWithoutCommunitiesInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isMainCookbook?: InputMaybe<Scalars['Boolean']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  rating?: InputMaybe<Scalars['Decimal']['input']>;
  ratingsCount?: InputMaybe<Scalars['Int']['input']>;
  recipes?: InputMaybe<RecipeCreateNestedManyWithoutCookbookInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutCookbooksInput;
};

export type CookbookCreateWithoutRecipesInput = {
  communities?: InputMaybe<CommunityCreateNestedManyWithoutCookbooksInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isMainCookbook?: InputMaybe<Scalars['Boolean']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  rating?: InputMaybe<Scalars['Decimal']['input']>;
  ratingsCount?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutCookbooksInput;
};

export type CookbookCreateWithoutUserInput = {
  communities?: InputMaybe<CommunityCreateNestedManyWithoutCookbooksInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isMainCookbook?: InputMaybe<Scalars['Boolean']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  rating?: InputMaybe<Scalars['Decimal']['input']>;
  ratingsCount?: InputMaybe<Scalars['Int']['input']>;
  recipes?: InputMaybe<RecipeCreateNestedManyWithoutCookbookInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CookbookListRelationFilter = {
  every?: InputMaybe<CookbookWhereInput>;
  none?: InputMaybe<CookbookWhereInput>;
  some?: InputMaybe<CookbookWhereInput>;
};

export type CookbookUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  isMainCookbook?: InputMaybe<BoolFieldUpdateOperationsInput>;
  isPublic?: InputMaybe<BoolFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  rating?: InputMaybe<NullableDecimalFieldUpdateOperationsInput>;
  ratingsCount?: InputMaybe<IntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CookbookWhereInput = {
  AND?: InputMaybe<Array<CookbookWhereInput>>;
  NOT?: InputMaybe<Array<CookbookWhereInput>>;
  OR?: InputMaybe<Array<CookbookWhereInput>>;
  communities?: InputMaybe<CommunityListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  isMainCookbook?: InputMaybe<BoolFilter>;
  isPublic?: InputMaybe<BoolFilter>;
  name?: InputMaybe<StringFilter>;
  rating?: InputMaybe<DecimalNullableFilter>;
  ratingsCount?: InputMaybe<IntFilter>;
  recipes?: InputMaybe<RecipeListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<IntFilter>;
};

export type CookbookWhereUniqueInput = {
  AND?: InputMaybe<Array<CookbookWhereInput>>;
  NOT?: InputMaybe<Array<CookbookWhereInput>>;
  OR?: InputMaybe<Array<CookbookWhereInput>>;
  communities?: InputMaybe<CommunityListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  isMainCookbook?: InputMaybe<BoolFilter>;
  isPublic?: InputMaybe<BoolFilter>;
  name?: InputMaybe<StringFilter>;
  rating?: InputMaybe<DecimalNullableFilter>;
  ratingsCount?: InputMaybe<IntFilter>;
  recipes?: InputMaybe<RecipeListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<IntFilter>;
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DecimalNullableFilter = {
  equals?: InputMaybe<Scalars['Decimal']['input']>;
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  in?: InputMaybe<Array<Scalars['Decimal']['input']>>;
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  not?: InputMaybe<NestedDecimalNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Decimal']['input']>>;
};

export type EnumPermissionLevelFilter = {
  equals?: InputMaybe<PermissionLevel>;
  in?: InputMaybe<Array<PermissionLevel>>;
  not?: InputMaybe<NestedEnumPermissionLevelFilter>;
  notIn?: InputMaybe<Array<PermissionLevel>>;
};

export type EnumResourceTypeFilter = {
  equals?: InputMaybe<ResourceType>;
  in?: InputMaybe<Array<ResourceType>>;
  not?: InputMaybe<NestedEnumResourceTypeFilter>;
  notIn?: InputMaybe<Array<ResourceType>>;
};

export type EnumRoleFilter = {
  equals?: InputMaybe<Role>;
  in?: InputMaybe<Array<Role>>;
  not?: InputMaybe<NestedEnumRoleFilter>;
  notIn?: InputMaybe<Array<Role>>;
};

export type IntFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Int']['input']>;
  divide?: InputMaybe<Scalars['Int']['input']>;
  increment?: InputMaybe<Scalars['Int']['input']>;
  multiply?: InputMaybe<Scalars['Int']['input']>;
  set?: InputMaybe<Scalars['Int']['input']>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String']['output'];
  email: Scalars['String']['output'];
  userId: Scalars['Float']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addRecipeToCookbook?: Maybe<Recipe>;
  changeNameUser: User;
  changePictureUser: User;
  changeUserPassword: User;
  createCookbook: Cookbook;
  createPermission: Permission;
  createRecipe?: Maybe<Recipe>;
  createUser: User;
  deleteCookbook: Scalars['Boolean']['output'];
  deletePermission: Permission;
  deleteRecipe: Scalars['Boolean']['output'];
  deleteRecipeFromCookbook: Cookbook;
  deleteUser?: Maybe<User>;
  duplicateRecipe?: Maybe<Recipe>;
  editCookbook: Cookbook;
  editPermission: Permission;
  editRecipe: Recipe;
  login: LoginResponse;
  signup: Scalars['Boolean']['output'];
  updateCookbookRating: Cookbook;
  updateRecipeRating: Recipe;
};


export type MutationAddRecipeToCookbookArgs = {
  cookbookIds: Array<Scalars['Int']['input']>;
  recipeId: Scalars['Int']['input'];
};


export type MutationChangeNameUserArgs = {
  data: Scalars['String']['input'];
  id: Scalars['Float']['input'];
};


export type MutationChangePictureUserArgs = {
  id: Scalars['Float']['input'];
  image: Scalars['String']['input'];
};


export type MutationChangeUserPasswordArgs = {
  id: Scalars['Float']['input'];
  password: Scalars['String']['input'];
};


export type MutationCreateCookbookArgs = {
  data: CookbookCreateInput;
};


export type MutationCreatePermissionArgs = {
  data: PermissionCreateInput;
};


export type MutationCreateRecipeArgs = {
  data: RecipeCreateInput;
};


export type MutationCreateUserArgs = {
  user: UserCreateInput;
};


export type MutationDeleteCookbookArgs = {
  cookbookId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationDeletePermissionArgs = {
  data: PermissionWhereInput;
};


export type MutationDeleteRecipeArgs = {
  recipeId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationDeleteRecipeFromCookbookArgs = {
  cookbookId: Scalars['Int']['input'];
  recipeId: Scalars['Int']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDuplicateRecipeArgs = {
  newUserId: Scalars['Int']['input'];
  recipeId: Scalars['Int']['input'];
};


export type MutationEditCookbookArgs = {
  cookbookId: Scalars['Int']['input'];
  data: CookbookUpdateManyMutationInput;
};


export type MutationEditPermissionArgs = {
  permissionLevel: PermissionLevel;
  resourceId: Scalars['Int']['input'];
  resourceType: ResourceType;
  userId: Scalars['Int']['input'];
};


export type MutationEditRecipeArgs = {
  data: RecipeUpdateManyMutationInput;
  recipeId: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationSignupArgs = {
  data: SignupInput;
};


export type MutationUpdateCookbookRatingArgs = {
  cookbookId: Scalars['Int']['input'];
  rating: Scalars['Float']['input'];
};


export type MutationUpdateRecipeRatingArgs = {
  rating: Scalars['Float']['input'];
  recipeId: Scalars['Int']['input'];
};

export type NestedBoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type NestedDecimalNullableFilter = {
  equals?: InputMaybe<Scalars['Decimal']['input']>;
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  in?: InputMaybe<Array<Scalars['Decimal']['input']>>;
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  not?: InputMaybe<NestedDecimalNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Decimal']['input']>>;
};

export type NestedEnumPermissionLevelFilter = {
  equals?: InputMaybe<PermissionLevel>;
  in?: InputMaybe<Array<PermissionLevel>>;
  not?: InputMaybe<NestedEnumPermissionLevelFilter>;
  notIn?: InputMaybe<Array<PermissionLevel>>;
};

export type NestedEnumResourceTypeFilter = {
  equals?: InputMaybe<ResourceType>;
  in?: InputMaybe<Array<ResourceType>>;
  not?: InputMaybe<NestedEnumResourceTypeFilter>;
  notIn?: InputMaybe<Array<ResourceType>>;
};

export type NestedEnumRoleFilter = {
  equals?: InputMaybe<Role>;
  in?: InputMaybe<Array<Role>>;
  not?: InputMaybe<NestedEnumRoleFilter>;
  notIn?: InputMaybe<Array<Role>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NestedIntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type NullableDecimalFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Decimal']['input']>;
  divide?: InputMaybe<Scalars['Decimal']['input']>;
  increment?: InputMaybe<Scalars['Decimal']['input']>;
  multiply?: InputMaybe<Scalars['Decimal']['input']>;
  set?: InputMaybe<Scalars['Decimal']['input']>;
};

export type NullableIntFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Int']['input']>;
  divide?: InputMaybe<Scalars['Int']['input']>;
  increment?: InputMaybe<Scalars['Int']['input']>;
  multiply?: InputMaybe<Scalars['Int']['input']>;
  set?: InputMaybe<Scalars['Int']['input']>;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']['input']>;
};

export type Permission = {
  __typename?: 'Permission';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  permissionLevel: PermissionLevel;
  resourceId: Scalars['Int']['output'];
  resourceType: ResourceType;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['Int']['output'];
};

export type PermissionCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  permissionLevel: PermissionLevel;
  resourceId: Scalars['Int']['input'];
  resourceType: ResourceType;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['Int']['input'];
};

export enum PermissionLevel {
  Creator = 'CREATOR',
  Editor = 'EDITOR',
  Viewer = 'VIEWER'
}

export type PermissionWhereInput = {
  AND?: InputMaybe<Array<PermissionWhereInput>>;
  NOT?: InputMaybe<Array<PermissionWhereInput>>;
  OR?: InputMaybe<Array<PermissionWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  permissionLevel?: InputMaybe<EnumPermissionLevelFilter>;
  resourceId?: InputMaybe<IntFilter>;
  resourceType?: InputMaybe<EnumResourceTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<IntFilter>;
};

export type Query = {
  __typename?: 'Query';
  getCookbooksByIds?: Maybe<Array<Cookbook>>;
  getPermission?: Maybe<Array<Permission>>;
  getRecipesByCookbookId?: Maybe<Array<Recipe>>;
  getUserById?: Maybe<User>;
  getUserCookbooks?: Maybe<Array<Cookbook>>;
  hello: Scalars['String']['output'];
  hpGetRecentRecipes?: Maybe<Array<Recipe>>;
  hpGetTopRecipes?: Maybe<Array<Recipe>>;
  searchCookbook?: Maybe<Array<Cookbook>>;
  searchRecipes?: Maybe<Array<Recipe>>;
  searchUser?: Maybe<Array<User>>;
};


export type QueryGetCookbooksByIdsArgs = {
  ids: Array<Scalars['Float']['input']>;
};


export type QueryGetPermissionArgs = {
  data: PermissionWhereInput;
};


export type QueryGetRecipesByCookbookIdArgs = {
  cookbookId: Scalars['Float']['input'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetUserCookbooksArgs = {
  userId: Scalars['Float']['input'];
};


export type QueryHpGetRecentRecipesArgs = {
  first?: Scalars['Int']['input'];
  skip?: Scalars['Int']['input'];
};


export type QueryHpGetTopRecipesArgs = {
  first?: Scalars['Int']['input'];
  skip?: Scalars['Int']['input'];
};


export type QuerySearchCookbookArgs = {
  query: Scalars['String']['input'];
};


export type QuerySearchRecipesArgs = {
  query: Scalars['String']['input'];
};


export type QuerySearchUserArgs = {
  query: Scalars['String']['input'];
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type Recipe = {
  __typename?: 'Recipe';
  _count: RecipeCount;
  communities?: Maybe<Array<Community>>;
  cookTime?: Maybe<Scalars['Int']['output']>;
  cookbook?: Maybe<Array<Cookbook>>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  directions?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  ingredients?: Maybe<Array<Scalars['String']['output']>>;
  isPublic: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  prepTime?: Maybe<Scalars['Int']['output']>;
  rating?: Maybe<Scalars['Decimal']['output']>;
  ratingsCount: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};

export type RecipeCount = {
  __typename?: 'RecipeCount';
  communities: Scalars['Int']['output'];
  cookbook: Scalars['Int']['output'];
};

export type RecipeCreateInput = {
  communities?: InputMaybe<CommunityCreateNestedManyWithoutRecipesInput>;
  cookTime?: InputMaybe<Scalars['Int']['input']>;
  cookbook?: InputMaybe<CookbookCreateNestedManyWithoutRecipesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  directions?: InputMaybe<RecipeCreatedirectionsInput>;
  image?: InputMaybe<Scalars['String']['input']>;
  ingredients?: InputMaybe<RecipeCreateingredientsInput>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  prepTime?: InputMaybe<Scalars['Int']['input']>;
  rating?: InputMaybe<Scalars['Decimal']['input']>;
  ratingsCount?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutRecipesInput;
};

export type RecipeCreateManyUserInput = {
  cookTime?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  directions?: InputMaybe<RecipeCreatedirectionsInput>;
  id?: InputMaybe<Scalars['Int']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  ingredients?: InputMaybe<RecipeCreateingredientsInput>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  prepTime?: InputMaybe<Scalars['Int']['input']>;
  rating?: InputMaybe<Scalars['Decimal']['input']>;
  ratingsCount?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type RecipeCreateManyUserInputEnvelope = {
  data: Array<RecipeCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RecipeCreateNestedManyWithoutCommunitiesInput = {
  connect?: InputMaybe<Array<RecipeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RecipeCreateOrConnectWithoutCommunitiesInput>>;
  create?: InputMaybe<Array<RecipeCreateWithoutCommunitiesInput>>;
};

export type RecipeCreateNestedManyWithoutCookbookInput = {
  connect?: InputMaybe<Array<RecipeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RecipeCreateOrConnectWithoutCookbookInput>>;
  create?: InputMaybe<Array<RecipeCreateWithoutCookbookInput>>;
};

export type RecipeCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<RecipeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RecipeCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<RecipeCreateWithoutUserInput>>;
  createMany?: InputMaybe<RecipeCreateManyUserInputEnvelope>;
};

export type RecipeCreateOrConnectWithoutCommunitiesInput = {
  create: RecipeCreateWithoutCommunitiesInput;
  where: RecipeWhereUniqueInput;
};

export type RecipeCreateOrConnectWithoutCookbookInput = {
  create: RecipeCreateWithoutCookbookInput;
  where: RecipeWhereUniqueInput;
};

export type RecipeCreateOrConnectWithoutUserInput = {
  create: RecipeCreateWithoutUserInput;
  where: RecipeWhereUniqueInput;
};

export type RecipeCreateWithoutCommunitiesInput = {
  cookTime?: InputMaybe<Scalars['Int']['input']>;
  cookbook?: InputMaybe<CookbookCreateNestedManyWithoutRecipesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  directions?: InputMaybe<RecipeCreatedirectionsInput>;
  image?: InputMaybe<Scalars['String']['input']>;
  ingredients?: InputMaybe<RecipeCreateingredientsInput>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  prepTime?: InputMaybe<Scalars['Int']['input']>;
  rating?: InputMaybe<Scalars['Decimal']['input']>;
  ratingsCount?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutRecipesInput;
};

export type RecipeCreateWithoutCookbookInput = {
  communities?: InputMaybe<CommunityCreateNestedManyWithoutRecipesInput>;
  cookTime?: InputMaybe<Scalars['Int']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  directions?: InputMaybe<RecipeCreatedirectionsInput>;
  image?: InputMaybe<Scalars['String']['input']>;
  ingredients?: InputMaybe<RecipeCreateingredientsInput>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  prepTime?: InputMaybe<Scalars['Int']['input']>;
  rating?: InputMaybe<Scalars['Decimal']['input']>;
  ratingsCount?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutRecipesInput;
};

export type RecipeCreateWithoutUserInput = {
  communities?: InputMaybe<CommunityCreateNestedManyWithoutRecipesInput>;
  cookTime?: InputMaybe<Scalars['Int']['input']>;
  cookbook?: InputMaybe<CookbookCreateNestedManyWithoutRecipesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  directions?: InputMaybe<RecipeCreatedirectionsInput>;
  image?: InputMaybe<Scalars['String']['input']>;
  ingredients?: InputMaybe<RecipeCreateingredientsInput>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  prepTime?: InputMaybe<Scalars['Int']['input']>;
  rating?: InputMaybe<Scalars['Decimal']['input']>;
  ratingsCount?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type RecipeCreatedirectionsInput = {
  set: Array<Scalars['String']['input']>;
};

export type RecipeCreateingredientsInput = {
  set: Array<Scalars['String']['input']>;
};

export type RecipeListRelationFilter = {
  every?: InputMaybe<RecipeWhereInput>;
  none?: InputMaybe<RecipeWhereInput>;
  some?: InputMaybe<RecipeWhereInput>;
};

export type RecipeUpdateManyMutationInput = {
  cookTime?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  directions?: InputMaybe<RecipeUpdatedirectionsInput>;
  image?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  ingredients?: InputMaybe<RecipeUpdateingredientsInput>;
  isPublic?: InputMaybe<BoolFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  prepTime?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  rating?: InputMaybe<NullableDecimalFieldUpdateOperationsInput>;
  ratingsCount?: InputMaybe<IntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type RecipeUpdatedirectionsInput = {
  push?: InputMaybe<Array<Scalars['String']['input']>>;
  set?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type RecipeUpdateingredientsInput = {
  push?: InputMaybe<Array<Scalars['String']['input']>>;
  set?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type RecipeWhereInput = {
  AND?: InputMaybe<Array<RecipeWhereInput>>;
  NOT?: InputMaybe<Array<RecipeWhereInput>>;
  OR?: InputMaybe<Array<RecipeWhereInput>>;
  communities?: InputMaybe<CommunityListRelationFilter>;
  cookTime?: InputMaybe<IntNullableFilter>;
  cookbook?: InputMaybe<CookbookListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  directions?: InputMaybe<StringNullableListFilter>;
  id?: InputMaybe<IntFilter>;
  image?: InputMaybe<StringNullableFilter>;
  ingredients?: InputMaybe<StringNullableListFilter>;
  isPublic?: InputMaybe<BoolFilter>;
  name?: InputMaybe<StringFilter>;
  prepTime?: InputMaybe<IntNullableFilter>;
  rating?: InputMaybe<DecimalNullableFilter>;
  ratingsCount?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<IntFilter>;
};

export type RecipeWhereUniqueInput = {
  AND?: InputMaybe<Array<RecipeWhereInput>>;
  NOT?: InputMaybe<Array<RecipeWhereInput>>;
  OR?: InputMaybe<Array<RecipeWhereInput>>;
  communities?: InputMaybe<CommunityListRelationFilter>;
  cookTime?: InputMaybe<IntNullableFilter>;
  cookbook?: InputMaybe<CookbookListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  directions?: InputMaybe<StringNullableListFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  image?: InputMaybe<StringNullableFilter>;
  ingredients?: InputMaybe<StringNullableListFilter>;
  isPublic?: InputMaybe<BoolFilter>;
  name?: InputMaybe<StringFilter>;
  prepTime?: InputMaybe<IntNullableFilter>;
  rating?: InputMaybe<DecimalNullableFilter>;
  ratingsCount?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<IntFilter>;
};

export enum ResourceType {
  Community = 'COMMUNITY',
  Cookbook = 'COOKBOOK',
  Recipe = 'RECIPE'
}

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}


export type SignupInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type StringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']['input']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringNullableListFilter = {
  equals?: InputMaybe<Array<Scalars['String']['input']>>;
  has?: InputMaybe<Scalars['String']['input']>;
  hasEvery?: InputMaybe<Array<Scalars['String']['input']>>;
  hasSome?: InputMaybe<Array<Scalars['String']['input']>>;
  isEmpty?: InputMaybe<Scalars['Boolean']['input']>;
};

export type User = {
  __typename?: 'User';
  _count: UserCount;
  comments?: Maybe<Array<Comment>>;
  communities?: Maybe<Array<Community>>;
  cookbooks?: Maybe<Array<Cookbook>>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  mainCookbookId?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  password: Scalars['String']['output'];
  recipes?: Maybe<Array<Recipe>>;
  role: Role;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type UserCount = {
  __typename?: 'UserCount';
  comments: Scalars['Int']['output'];
  communities: Scalars['Int']['output'];
  cookbooks: Scalars['Int']['output'];
  recipes: Scalars['Int']['output'];
};

export type UserCreateInput = {
  comments?: InputMaybe<CommentCreateNestedManyWithoutUserInput>;
  communities?: InputMaybe<CommunityCreateNestedManyWithoutUserInput>;
  cookbooks?: InputMaybe<CookbookCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  mainCookbookId?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  recipes?: InputMaybe<RecipeCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<Role>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  username: Scalars['String']['input'];
};

export type UserCreateNestedOneWithoutCommunitiesInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutCommunitiesInput>;
  create?: InputMaybe<UserCreateWithoutCommunitiesInput>;
};

export type UserCreateNestedOneWithoutCookbooksInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutCookbooksInput>;
  create?: InputMaybe<UserCreateWithoutCookbooksInput>;
};

export type UserCreateNestedOneWithoutRecipesInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutRecipesInput>;
  create?: InputMaybe<UserCreateWithoutRecipesInput>;
};

export type UserCreateOrConnectWithoutCommunitiesInput = {
  create: UserCreateWithoutCommunitiesInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutCookbooksInput = {
  create: UserCreateWithoutCookbooksInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutRecipesInput = {
  create: UserCreateWithoutRecipesInput;
  where: UserWhereUniqueInput;
};

export type UserCreateWithoutCommunitiesInput = {
  comments?: InputMaybe<CommentCreateNestedManyWithoutUserInput>;
  cookbooks?: InputMaybe<CookbookCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  mainCookbookId?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  recipes?: InputMaybe<RecipeCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<Role>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  username: Scalars['String']['input'];
};

export type UserCreateWithoutCookbooksInput = {
  comments?: InputMaybe<CommentCreateNestedManyWithoutUserInput>;
  communities?: InputMaybe<CommunityCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  mainCookbookId?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  recipes?: InputMaybe<RecipeCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<Role>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  username: Scalars['String']['input'];
};

export type UserCreateWithoutRecipesInput = {
  comments?: InputMaybe<CommentCreateNestedManyWithoutUserInput>;
  communities?: InputMaybe<CommunityCreateNestedManyWithoutUserInput>;
  cookbooks?: InputMaybe<CookbookCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  mainCookbookId?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  role?: InputMaybe<Role>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  username: Scalars['String']['input'];
};

export type UserRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  comments?: InputMaybe<CommentListRelationFilter>;
  communities?: InputMaybe<CommunityListRelationFilter>;
  cookbooks?: InputMaybe<CookbookListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  image?: InputMaybe<StringNullableFilter>;
  mainCookbookId?: InputMaybe<IntNullableFilter>;
  name?: InputMaybe<StringNullableFilter>;
  password?: InputMaybe<StringFilter>;
  recipes?: InputMaybe<RecipeListRelationFilter>;
  role?: InputMaybe<EnumRoleFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  username?: InputMaybe<StringFilter>;
};

export type UserWhereUniqueInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  comments?: InputMaybe<CommentListRelationFilter>;
  communities?: InputMaybe<CommunityListRelationFilter>;
  cookbooks?: InputMaybe<CookbookListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  image?: InputMaybe<StringNullableFilter>;
  mainCookbookId?: InputMaybe<IntNullableFilter>;
  name?: InputMaybe<StringNullableFilter>;
  password?: InputMaybe<StringFilter>;
  recipes?: InputMaybe<RecipeListRelationFilter>;
  role?: InputMaybe<EnumRoleFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export const MeasurementTypes = [
  { label: 'tsp', value: 'tsp' },
  { label: 'tbsp', value: 'tbsp' },
  { label: 'cup', value: 'cup' },
  { label: 'oz', value: 'oz' },
  { label: 'lb', value: 'lb' },
  { label: 'g', value: 'g' },
  { label: 'mg', value: 'mg' },
  { label: 'kg', value: 'kg' },
  { label: 'ml', value: 'ml' },
  { label: 'liter', value: 'liter' },
  { label: 'pinch', value: 'pinch' },
  { label: 'part', value: 'part' },
  { label: 'drop', value: 'drop' },
];

export const ContentType = [
  { label: 'Recipes', value: 'Recipe' },
  { label: 'Cookbooks', value: 'Cookbook' },
  // { label: 'Communities', value: 'Community' },
]
