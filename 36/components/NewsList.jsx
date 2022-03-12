import React, {useCallback, useEffect, useState} from "react";
import * as WebBrowser from "expo-web-browser";
import {FlatList, TouchableOpacity} from "react-native";
import styled from "styled-components/native";
import {getNewsByChannel} from "../api/news";

const Container = styled.View`
  padding: 24px 5px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #000;
`;

const Abstract = styled.Text`
  font-size: 12px;
  color: grey;
  padding-top: 5px;
`;

const Loading = styled.Text`
  align-items: center;
`;

const Line = styled.View`
  height: 1px;
  background-color: #333;
`;

export default function () {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(async () => {
        const content = await getNewsByChannel(null, page);
        setContent(prev => prev.concat(content));
    }, [setContent, page]);

    const loadMore = useCallback((info) => {
        setPage(page => page + 1);
    }, [setPage]);

    return (
        <FlatList
            data={content}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={loadMore}
            onEndReachedThreshold={0.2}
            ListFooterComponent={() => <Loading>loading...</Loading>}
            ItemSeparatorComponent={
                () => (<Line/>)
            }
            renderItem={
                ({item}) => (
                    <TouchableOpacity onPress={
                        () => WebBrowser.openBrowserAsync(item.url)
                    }>
                        <Container>
                            <Title>{item.title}</Title>
                            <Abstract>{item.abstract}</Abstract>
                        </Container>
                    </TouchableOpacity>
                )
            }
        >
        </FlatList>
    );
}
